from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum
import uuid

app = FastAPI(title="Todo Backend Service (Standalone)", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
tasks_db = {}
user_tasks_index = {}

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
    recurrence_pattern: Optional[str] = None
    user_id: str
    created_at: Optional[datetime] = None

@app.get("/")
async def root():
    return {
        "message": "Todo Backend Service (Standalone Mode)",
        "version": "1.0.0",
        "status": "running",
        "mode": "standalone"
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "todo-backend-standalone"}

@app.post("/tasks")
async def create_task(task: Task):
    task.id = str(uuid.uuid4())
    task.created_at = datetime.now(timezone.utc)

    # Store in memory
    tasks_db[task.id] = task

    # Update user index
    if task.user_id not in user_tasks_index:
        user_tasks_index[task.user_id] = []
    user_tasks_index[task.user_id].append(task.id)

    return task

@app.get("/tasks/{task_id}")
async def get_task(task_id: str):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    return tasks_db[task_id]

@app.put("/tasks/{task_id}")
async def update_task(task_id: str, task: Task):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")

    old_task = tasks_db[task_id]
    task.id = task_id
    task.created_at = old_task.created_at

    # Update user index if user changed
    if old_task.user_id != task.user_id:
        if old_task.user_id in user_tasks_index:
            user_tasks_index[old_task.user_id].remove(task_id)
        if task.user_id not in user_tasks_index:
            user_tasks_index[task.user_id] = []
        user_tasks_index[task.user_id].append(task_id)

    tasks_db[task_id] = task
    return task

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")

    task = tasks_db[task_id]

    # Remove from user index
    if task.user_id in user_tasks_index:
        user_tasks_index[task.user_id].remove(task_id)

    del tasks_db[task_id]
    return {"message": "Task deleted successfully"}

@app.get("/tasks")
async def list_tasks(
    user_id: Optional[str] = None,
    priority: Optional[Priority] = None,
    completed: Optional[bool] = None,
    tag: Optional[str] = None
):
    if not user_id:
        return []

    if user_id not in user_tasks_index:
        return []

    tasks = []
    for task_id in user_tasks_index[user_id]:
        if task_id in tasks_db:
            task = tasks_db[task_id]

            # Apply filters
            if priority and task.priority != priority:
                continue
            if completed is not None and task.completed != completed:
                continue
            if tag and tag not in task.tags:
                continue

            tasks.append(task)

    return tasks

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
