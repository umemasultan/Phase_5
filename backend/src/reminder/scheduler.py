from datetime import datetime, timezone
from typing import Dict, Any
import uuid
from dapr.clients import DaprClient

DAPR_PUBSUB_NAME = "pubsub"
DAPR_HTTP_PORT = 3500

async def schedule_reminder(task_id: str, remind_at: datetime, task_data: Dict[str, Any]):
    """
    Schedule a reminder using Dapr Jobs API.
    This is production-ready and survives service restarts.
    """
    print(f"Scheduling reminder for task {task_id} at {remind_at}")

    try:
        with DaprClient() as client:
            job_name = f"reminder-{task_id}"

            # Prepare job data
            job_data = {
                "task_id": task_id,
                "title": task_data.get("title", ""),
                "due_at": task_data.get("due_at"),
                "remind_at": remind_at.isoformat(),
                "user_id": task_data.get("user_id", "")
            }

            # Schedule job using Dapr Jobs API
            # The job will trigger at the exact time specified
            response = await client.schedule_job_alpha1(
                name=job_name,
                schedule=remind_at.isoformat(),
                data=job_data,
                repeats=0,
                ttl="24h"
            )

            print(f"✅ Scheduled reminder job {job_name} at {remind_at}")
            return response

    except Exception as e:
        print(f"❌ Failed to schedule reminder for task {task_id}: {str(e)}")
        raise

async def trigger_reminder(task_id: str, task_data: Dict[str, Any]):
    """Trigger a reminder by publishing to the reminder topic"""
    with DaprClient() as client:
        reminder_event = {
            "id": str(uuid.uuid4()),
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