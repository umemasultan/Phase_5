from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
import dapr.clients
from dapr.clients import DaprClient
from datetime import datetime
import asyncio

app = FastAPI(title="Notification Service", version="1.0.0")

DAPR_PUBSUB_NAME = "pubsub"

class ReminderEvent(BaseModel):
    id: str
    task_id: str
    title: str
    due_at: str
    remind_at: str
    user_id: str

@app.on_event("startup")
async def startup_event():
    print("Notification service started")

@app.get("/")
async def root():
    return {"message": "Notification Service", "version": "1.0.0"}

@app.post("/reminders")
async def handle_reminder(reminder: ReminderEvent):
    print(f"Notification Service: Processing reminder for task {reminder.task_id}")
    print(f"Reminder details: {reminder.title} for user {reminder.user_id}")

    # In a real implementation, this would send notifications via email, push, etc.
    # For now, just log the reminder
    await send_notification(reminder)

    return {"status": "notification_sent"}

async def send_notification(reminder: ReminderEvent):
    """Send actual notification (email, push, etc.)"""
    print(f"SENDING NOTIFICATION: Task '{reminder.title}' is due!")

    # In a real system, this would:
    # - Look up user's preferred notification method
    # - Send email/SMS/push notification
    # - Log notification event
    pass

# Dapr service subscription setup
from dapr.ext.grpc import App

# Initialize Dapr app
dapr_app = App()

@dapr_app.subscribe(pubsub='pubsub', topic='reminder-events')
async def handle_reminder_events(event_data: dict) -> None:
    print(f"Notification Service: Processing reminder event {event_data}")

    reminder = ReminderEvent(
        id=event_data.get('id', ''),
        task_id=event_data.get('task_id', ''),
        title=event_data.get('title', ''),
        due_at=event_data.get('due_at', ''),
        remind_at=event_data.get('remind_at', ''),
        user_id=event_data.get('user_id', '')
    )

    await send_notification(reminder)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)