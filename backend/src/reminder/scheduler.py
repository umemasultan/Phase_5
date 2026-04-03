import asyncio
from datetime import datetime, timezone
from typing import Dict, Any
import dapr.clients
from dapr.clients import DaprClient

DAPR_PUBSUB_NAME = "pubsub"

async def schedule_reminder(task_id: str, remind_at: datetime, task_data: Dict[str, Any]):
    """
    Schedule a reminder using Dapr's capabilities.
    Note: Dapr doesn't have a built-in Jobs API, so we'll implement a workaround
    using a separate scheduler or by publishing to a timed pubsub.
    """
    print(f"Scheduling reminder for task {task_id} at {remind_at}")

    # In a real implementation, this would interface with a scheduler service
    # For now, we'll calculate the delay and wait, then publish the reminder event
    delay_seconds = (remind_at - datetime.now(timezone.utc)).total_seconds()

    if delay_seconds <= 0:
        # Time already passed, trigger immediately
        await asyncio.create_task(trigger_reminder(task_id, task_data))
        return

    # For a real production system, this should use proper job scheduling
    # like Kubernetes CronJobs, or a dedicated scheduler service
    await asyncio.sleep(delay_seconds)
    await trigger_reminder(task_id, task_data)

async def trigger_reminder(task_id: str, task_data: Dict[str, Any]):
    """Trigger a reminder by publishing to the reminder topic"""
    with DaprClient() as client:
        reminder_event = {
            "id": task_id,  # Generate proper ID in real implementation
            "task_id": task_id,
            "title": task_data.get("title", ""),
            "due_at": task_data.get("due_at"),
            "remind_at": datetime.now(timezone.utc).isoformat(),
            "user_id": task_data.get("user_id", "")
        }

        await client.publish_event(
            pubsub_name=DAPR_PUBSUB_NAME,
            topic_name="reminder-events",
            data=reminder_event
        )
        print(f"Reminder triggered for task {task_id}")