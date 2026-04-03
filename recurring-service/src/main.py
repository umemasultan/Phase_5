from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uuid
from datetime import datetime, timedelta, timezone
import dapr.clients
from dapr.clients import DaprClient
from dapr.ext import runtime
import asyncio

app = FastAPI(title="Recurring Task Service", version="1.0.0")

DAPR_PUBSUB_NAME = "pubsub"

class TaskEvent(BaseModel):
    id: str
    event_type: str
    task_id: str
    payload: Dict[str, Any]
    user_id: str
    timestamp: datetime
    version: str

@app.on_event("startup")
async def startup_event():
    print("Recurring service started")

@app.get("/")
async def root():
    return {"message": "Recurring Task Service", "version": "1.0.0"}

# Dapr subscription for task events
@app.post("/tasks")
async def handle_task_event(event: TaskEvent):
    print(f"Received task event: {event.event_type} for task {event.task_id}")

    # Handle task completion for recurring tasks
    if event.event_type == "task.completed":
        payload = event.payload
        recurrence_pattern = payload.get("recurrence_pattern")

        if recurrence_pattern:
            print(f"Task {event.task_id} has recurrence pattern: {recurrence_pattern}")
            # Generate next occurrence based on recurrence pattern
            new_task = await generate_next_occurrence(event)
            if new_task:
                print(f"Generated new task: {new_task['id']}")

    return {"status": "processed"}

async def generate_next_occurrence(event: TaskEvent) -> Optional[Dict[str, Any]]:
    """Generate the next occurrence of a recurring task"""
    payload = event.payload
    recurrence_pattern = payload.get("recurrence_pattern")

    # Get original task info
    title = payload.get("title", "")
    description = payload.get("description", "")
    priority = payload.get("priority", "MEDIUM")
    tags = payload.get("tags", [])
    user_id = payload.get("user_id", "")

    # Calculate next occurrence date based on pattern
    next_due_at = None
    if recurrence_pattern == "daily":
        next_due_at = datetime.now(timezone.utc) + timedelta(days=1)
    elif recurrence_pattern == "weekly":
        next_due_at = datetime.now(timezone.utc) + timedelta(weeks=1)
    elif recurrence_pattern == "monthly":
        # Simple: add 30 days for monthly
        next_due_at = datetime.now(timezone.utc) + timedelta(days=30)
    else:
        print(f"Unknown recurrence pattern: {recurrence_pattern}")
        return None

    # Create new task
    new_task = {
        "id": str(uuid.uuid4()),
        "title": f"{title} (Recurring)",
        "description": description,
        "completed": False,
        "due_at": next_due_at.isoformat() if next_due_at else None,
        "remind_at": None,  # Will be set by reminder service
        "priority": priority,
        "tags": tags,
        "recurrence_pattern": recurrence_pattern,
        "user_id": user_id,
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    # Publish task creation event
    with DaprClient() as client:
        task_event = {
            "id": str(uuid.uuid4()),
            "event_type": "task.created",
            "task_id": new_task["id"],
            "payload": new_task,
            "user_id": new_task["user_id"],
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "version": "1.0.0"
        }

        await client.publish_event(
            pubsub_name=DAPR_PUBSUB_NAME,
            topic_name="task-events",
            data=task_event
        )

    return new_task

# Dapr service subscription setup
from dapr.ext.grpc import App

# Initialize Dapr app
dapr_app = App()

@dapr_app.subscribe(pubsub='pubsub', topic='task-events')
async def handle_task_events(event_data: dict) -> None:
    print(f"Recurring Service: Processing event {event_data}")
    # Process the event to check for task completion
    if event_data.get('event_type') == 'task.completed':
        payload = event_data.get('payload', {})
        if payload.get('recurrence_pattern'):
            await generate_next_occurrence(TaskEvent(**event_data))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)