import asyncio
from datetime import datetime, timezone
import dapr.clients
from dapr.clients import DaprClient
import uuid
import sys
import os
import json

# Add the src directory to the path to import the main module
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

DAPR_PUBSUB_NAME = "pubsub"

async def schedule_reminder(task_id: str, remind_at: datetime, task_data: dict):
    """
    Schedule a reminder for a task at the specified time
    """
    try:
        # Calculate delay in seconds
        now = datetime.now(timezone.utc)
        delay_seconds = (remind_at - now).total_seconds()

        if delay_seconds > 0:
            # Wait for the specified time
            await asyncio.sleep(delay_seconds)

            # Import here rather than at module level to avoid circular imports
            from src.main import ReminderEvent

            # Create reminder event
            reminder_event = ReminderEvent(
                id=str(uuid.uuid4()),
                task_id=task_id,
                title=task_data.get('title', ''),
                due_at=task_data.get('due_at'),
                remind_at=remind_at,
                user_id=task_data.get('user_id', '')
            )

            # Publish reminder event
            with DaprClient() as client:
                await client.publish_event(
                    pubsub_name=DAPR_PUBSUB_NAME,
                    topic_name="reminder-events",
                    data=reminder_event.json()
                )
    except Exception as e:
        print(f"ERROR: Failed to schedule reminder for task {task_id}: {str(e)}")