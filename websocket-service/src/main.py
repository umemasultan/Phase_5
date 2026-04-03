from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import Dict, List, Any
import json
import asyncio
from datetime import datetime
import dapr.clients
from dapr.clients import DaprClient

app = FastAPI(title="WebSocket Service", version="1.0.0")

DAPR_PUBSUB_NAME = "pubsub"

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                # Remove disconnected connections
                self.disconnect(connection)

manager = ConnectionManager()

@app.on_event("startup")
async def startup_event():
    print("WebSocket service started")

@app.get("/")
async def root():
    return {"message": "WebSocket Service", "version": "1.0.0"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep the connection alive
            data = await websocket.receive_text()
            # Echo back for testing purposes
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# Dapr service subscription setup
from dapr.ext.grpc import App

# Initialize Dapr app
dapr_app = App()

@dapr_app.subscribe(pubsub='pubsub', topic='task-events')
async def handle_task_events(event_data: dict) -> None:
    print(f"WebSocket Service: Broadcasting task event {event_data}")

    # Broadcast the event to all connected clients
    message = json.dumps({
        "type": "task_update",
        "data": event_data,
        "timestamp": datetime.now().isoformat()
    })

    await manager.broadcast(message)

@dapr_app.subscribe(pubsub='pubsub', topic='reminder-events')
async def handle_reminder_events(event_data: dict) -> None:
    print(f"WebSocket Service: Broadcasting reminder event {event_data}")

    # Broadcast the reminder event to all connected clients
    message = json.dumps({
        "type": "reminder_update",
        "data": event_data,
        "timestamp": datetime.now().isoformat()
    })

    await manager.broadcast(message)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8004)