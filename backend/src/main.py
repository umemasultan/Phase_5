from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uuid
import asyncio
from datetime import datetime, timezone
import dapr.clients
from dapr.clients import DaprClient
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from reminder.scheduler import schedule_reminder

app = FastAPI(title="Todo Backend Service", version="1.0.0")

# Dapr client
DAPR_STORE_NAME = "statestore"
DAPR_PUBSUB_NAME = "pubsub"

# Models
from enum import Enum

class Priority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

class Task(BaseModel):
    id: Optional[str] = None
    title: str
    description: Optional[str] = None
    completed: bool = False
    due_at: Optional[datetime] = None
    remind_at: Optional[datetime] = None
    priority: Priority = Priority.MEDIUM
    tags: List[str] = []
    recurrence_pattern: Optional[str] = None  # daily, weekly, monthly
    user_id: str
    created_at: Optional[datetime] = None

class TaskEvent(BaseModel):
    id: str = str(uuid.uuid4())
    event_type: str
    task_id: str
    payload: Dict[str, Any]
    user_id: str
    timestamp: datetime = datetime.now(timezone.utc)
    version: str = "1.0.0"

class ReminderEvent(BaseModel):
    id: Optional[str] = None
    task_id: str
    title: str
    due_at: Optional[datetime] = None
    remind_at: Optional[datetime] = None
    user_id: str

@app.on_event("startup")
async def startup_event():
    print("Backend service started")

@app.get("/")
async def root():
    return {"message": "Todo Backend Service", "version": "1.0.0", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "todo-backend"}

@app.post("/tasks")
async def create_task(task: Task, background_tasks: BackgroundTasks):
    task.id = str(uuid.uuid4())
    task.created_at = datetime.now(timezone.utc)

    # Store task in Dapr state store
    with DaprClient() as client:
        await client.save_state(
            DAPR_STORE_NAME,
            task.id,
            task.json()
        )

        # Add task to user's task index
        # Get current user's task list
        user_task_index_key = f"tasks_user:{task.user_id}"
        user_task_index_state = await client.get_state(DAPR_STORE_NAME, user_task_index_key)

        if user_task_index_state.data:
            user_task_ids = user_task_index_state.data.decode('utf-8').split(',')
        else:
            user_task_ids = []

        # Add new task ID to the list
        user_task_ids.append(task.id)
        await client.save_state(
            DAPR_STORE_NAME,
            user_task_index_key,
            ','.join(user_task_ids)
        )

        # Publish task created event
        event = TaskEvent(
            event_type="task.created",
            task_id=task.id,
            payload=task.dict(),
            user_id=task.user_id
        )

        await client.publish_event(
            pubsub_name=DAPR_PUBSUB_NAME,
            topic_name="task-events",
            data=event.json()
        )

    # Schedule reminder if specified
    if task.remind_at:
        background_tasks.add_task(
            schedule_reminder, task.id, task.remind_at, task.dict()
        )

    return task

@app.get("/tasks/{task_id}")
async def get_task(task_id: str):
    with DaprClient() as client:
        state = await client.get_state(DAPR_STORE_NAME, task_id)

    if not state.data:
        raise HTTPException(status_code=404, detail="Task not found")

    return Task.parse_raw(state.data)

@app.put("/tasks/{task_id}")
async def update_task(task_id: str, task: Task):
    with DaprClient() as client:
        # Check if task exists
        existing_state = await client.get_state(DAPR_STORE_NAME, task_id)
        if not existing_state.data:
            raise HTTPException(status_code=404, detail="Task not found")

        # Get the existing task to check if user_id changed
        existing_task = Task.parse_raw(existing_state.data)
        old_user_id = existing_task.user_id
        new_user_id = task.user_id

        # Update task
        task.id = task_id
        await client.save_state(
            DAPR_STORE_NAME,
            task_id,
            task.json()
        )

        # Update task indexes if user changed
        if old_user_id != new_user_id:
            # Remove task from old user's index
            old_user_task_index_key = f"tasks_user:{old_user_id}"
            old_user_task_index_state = await client.get_state(DAPR_STORE_NAME, old_user_task_index_key)

            if old_user_task_index_state.data:
                old_user_task_ids = old_user_task_index_state.data.decode('utf-8').split(',')
                old_user_task_ids = [tid for tid in old_user_task_ids if tid != task_id]
                await client.save_state(
                    DAPR_STORE_NAME,
                    old_user_task_index_key,
                    ','.join(old_user_task_ids)
                )

            # Add task to new user's index
            new_user_task_index_key = f"tasks_user:{new_user_id}"
            new_user_task_index_state = await client.get_state(DAPR_STORE_NAME, new_user_task_index_key)

            if new_user_task_index_state.data:
                new_user_task_ids = new_user_task_index_state.data.decode('utf-8').split(',')
            else:
                new_user_task_ids = []

            if task_id not in new_user_task_ids:
                new_user_task_ids.append(task_id)
            await client.save_state(
                DAPR_STORE_NAME,
                new_user_task_index_key,
                ','.join(new_user_task_ids)
            )

        # Publish task updated event
        event = TaskEvent(
            event_type="task.updated",
            task_id=task.id,
            payload=task.dict(),
            user_id=task.user_id
        )

        await client.publish_event(
            pubsub_name=DAPR_PUBSUB_NAME,
            topic_name="task-events",
            data=event.json()
        )

    return task

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    with DaprClient() as client:
        # Check if task exists
        existing_state = await client.get_state(DAPR_STORE_NAME, task_id)
        if not existing_state.data:
            raise HTTPException(status_code=404, detail="Task not found")

        # Get the task to find the user_id for index update
        existing_task = Task.parse_raw(existing_state.data)

        # Delete task
        await client.delete_state(DAPR_STORE_NAME, task_id)

        # Remove task from user's index
        user_task_index_key = f"tasks_user:{existing_task.user_id}"
        user_task_index_state = await client.get_state(DAPR_STORE_NAME, user_task_index_key)

        if user_task_index_state.data:
            user_task_ids = user_task_index_state.data.decode('utf-8').split(',')
            user_task_ids = [tid for tid in user_task_ids if tid != task_id]
            await client.save_state(
                DAPR_STORE_NAME,
                user_task_index_key,
                ','.join(user_task_ids)
            )

        # Publish task deleted event
        event = TaskEvent(
            event_type="task.deleted",
            task_id=task_id,
            payload={},
            user_id=existing_task.user_id
        )

        await client.publish_event(
            pubsub_name=DAPR_PUBSUB_NAME,
            topic_name="task-events",
            data=event.json()
        )

    return {"message": "Task deleted successfully"}

@app.get("/tasks")
async def list_tasks(
    user_id: Optional[str] = None,
    priority: Optional[Priority] = None,
    completed: Optional[bool] = None,
    tag: Optional[str] = None
):
    """
    Returns tasks for the specified user, with optional filtering by priority, completion status, and tags.
    Uses the task index maintained in Dapr state store.
    """
    with DaprClient() as client:
        if not user_id:
            # If no user_id provided, return empty list
            return []

        # Get user's task index
        user_task_index_key = f"tasks_user:{user_id}"
        user_task_index_state = await client.get_state(DAPR_STORE_NAME, user_task_index_key)

        if not user_task_index_state.data:
            # No tasks for this user
            return []

        # Get task IDs from index
        user_task_ids = user_task_index_state.data.decode('utf-8').split(',')

        # Fetch each task and apply filters
        tasks = []
        for task_id in user_task_ids:
            if not task_id:  # Skip empty strings
                continue

            task_state = await client.get_state(DAPR_STORE_NAME, task_id)
            if task_state.data:
                task = Task.parse_raw(task_state.data)

                # Apply filters
                matches_filters = True

                if priority and task.priority != priority:
                    matches_filters = False
                if completed is not None and task.completed != completed:
                    matches_filters = False
                if tag and tag not in task.tags:
                    matches_filters = False

                if matches_filters:
                    tasks.append(task)

        return tasks

@app.post("/api/jobs/reminder-callback")
async def handle_reminder_job(request: Request):
    """
    Dapr Jobs API callback endpoint
    This is called by Dapr when the scheduled reminder time arrives
    """
    job_data = await request.json()

    # Extract reminder data
    task_id = job_data.get("task_id")
    user_id = job_data.get("user_id")
    title = job_data.get("title")

    print(f"⏰ Reminder triggered for task {task_id}")

    # Create reminder event
    reminder_event = ReminderEvent(
        id=str(uuid.uuid4()),
        task_id=task_id,
        title=title,
        due_at=job_data.get("due_at"),
        remind_at=job_data.get("remind_at"),
        user_id=user_id
    )

    # Publish reminder event to notification service
    with DaprClient() as client:
        await client.publish_event(
            pubsub_name=DAPR_PUBSUB_NAME,
            topic_name="reminder-events",
            data=reminder_event.json()
        )

    return {"status": "SUCCESS"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)