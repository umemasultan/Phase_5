"""
Reminder Scheduler using Dapr Jobs API
This module schedules reminders at exact times using Dapr Jobs API (not polling)
"""
from datetime import datetime, timezone
from dapr.clients import DaprClient
from dapr.clients.grpc._jobs import Job
import uuid
import json

DAPR_PUBSUB_NAME = "pubsub"

async def schedule_reminder(task_id: str, remind_at: datetime, task_data: dict):
    """
    Schedule a reminder using Dapr Jobs API (not asyncio.sleep)

    This uses Dapr Jobs API to schedule a callback at the exact time,
    which is production-ready and survives service restarts.
    """
    try:
        with DaprClient() as client:
            # Create a Dapr Job that fires at exact time
            job = Job(
                name=f"reminder-{task_id}",
                schedule=remind_at.isoformat(),  # ISO 8601 format for exact time
                data={
                    "task_id": task_id,
                    "title": task_data.get('title', ''),
                    "due_at": task_data.get('due_at'),
                    "remind_at": remind_at.isoformat(),
                    "user_id": task_data.get('user_id', '')
                }
            )

            # Schedule the job via Dapr Jobs API
            await client.schedule_job_alpha1(job, overwrite=True)

            print(f"✅ Scheduled reminder job for task {task_id} at {remind_at}")

    except Exception as e:
        print(f"❌ Failed to schedule reminder for task {task_id}: {str(e)}")
        raise
