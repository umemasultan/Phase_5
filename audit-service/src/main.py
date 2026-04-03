from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
import dapr.clients
from dapr.clients import DaprClient
import asyncio
import uuid
from datetime import datetime, timezone

app = FastAPI(title="Audit Service", version="1.0.0")

DAPR_PUBSUB_NAME = "pubsub"
DAPR_STORE_NAME = "statestore"

class AuditEvent(BaseModel):
    id: str
    event_type: str
    entity_id: str
    entity_type: str
    user_id: str
    timestamp: str
    data: Dict[str, Any]

# In-memory storage for audit events (in production, use a proper database)
audit_log = []

@app.on_event("startup")
async def startup_event():
    print("Audit service started")

@app.get("/")
async def root():
    return {"message": "Audit Service", "version": "1.0.0"}

@app.get("/audit/{entity_id}")
async def get_audit_trail(entity_id: str):
    """Get audit trail for a specific entity"""
    entity_audit_log = [event for event in audit_log if event.entity_id == entity_id]
    return entity_audit_log

@app.post("/audit")
async def create_audit_event(audit_event: AuditEvent):
    """Manually create an audit event"""
    audit_log.append(audit_event)
    print(f"Audit event created: {audit_event.event_type} for {audit_event.entity_type} {audit_event.entity_id}")

    # Store in Dapr state store as well for persistence
    with DaprClient() as client:
        await client.save_state(
            DAPR_STORE_NAME,
            f"audit-{audit_event.id}",
            audit_event.json()
        )

    return {"status": "audit_event_recorded", "id": audit_event.id}

# Dapr service subscription setup
from dapr.ext.grpc import App

# Initialize Dapr app
dapr_app = App()

@dapr_app.subscribe(pubsub='pubsub', topic='task-events')
async def handle_task_events(event_data: dict) -> None:
    print(f"Audit Service: Processing task event {event_data}")

    # Create audit event from task event
    audit_event = AuditEvent(
        id=str(uuid.uuid4()),
        event_type=f"task_{event_data.get('event_type', 'unknown')}",
        entity_id=event_data.get('task_id', ''),
        entity_type='task',
        user_id=event_data.get('user_id', ''),
        timestamp=datetime.now(timezone.utc).isoformat(),
        data=event_data
    )

    # Add to audit log
    audit_log.append(audit_event)

    # Store in Dapr state store
    with DaprClient() as client:
        await client.save_state(
            DAPR_STORE_NAME,
            f"audit-{audit_event.id}",
            audit_event.json()
        )

    print(f"Audit event recorded: {audit_event.event_type} for {audit_event.entity_id}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)