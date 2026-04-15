"""
Hugging Face Spaces Gradio Interface for Phase V Todo App
This provides a simple web interface to demonstrate the application
"""

import gradio as gr
import requests
import json
from datetime import datetime

# Backend URL (will be updated after backend deployment)
BACKEND_URL = "http://localhost:8000"

def create_task(title, description, priority, due_date):
    """Create a new task"""
    try:
        payload = {
            "title": title,
            "description": description,
            "priority": priority,
            "due_at": due_date,
            "user_id": "demo-user"
        }
        response = requests.post(f"{BACKEND_URL}/api/tasks", json=payload)
        if response.status_code == 200:
            return f"✅ Task created successfully!\n\n{json.dumps(response.json(), indent=2)}"
        else:
            return f"❌ Error: {response.text}"
    except Exception as e:
        return f"❌ Error: {str(e)}"

def get_tasks():
    """Get all tasks"""
    try:
        response = requests.get(f"{BACKEND_URL}/api/tasks")
        if response.status_code == 200:
            tasks = response.json()
            if not tasks:
                return "No tasks found."

            result = "📋 **All Tasks:**\n\n"
            for task in tasks:
                result += f"**{task.get('title', 'Untitled')}**\n"
                result += f"- Priority: {task.get('priority', 'N/A')}\n"
                result += f"- Status: {task.get('status', 'N/A')}\n"
                result += f"- Due: {task.get('due_at', 'N/A')}\n"
                result += f"- Description: {task.get('description', 'N/A')}\n\n"
            return result
        else:
            return f"❌ Error: {response.text}"
    except Exception as e:
        return f"❌ Error: {str(e)}"

def health_check():
    """Check backend health"""
    try:
        response = requests.get(f"{BACKEND_URL}/health")
        if response.status_code == 200:
            return f"✅ Backend is healthy!\n\n{json.dumps(response.json(), indent=2)}"
        else:
            return f"❌ Backend unhealthy: {response.text}"
    except Exception as e:
        return f"❌ Cannot connect to backend: {str(e)}"

# Create Gradio interface
with gr.Blocks(title="Phase V Todo Application", theme=gr.themes.Soft()) as demo:
    gr.Markdown("""
    # 🚀 Phase V Todo Application

    **Event-Driven Microservices with Dapr Abstraction**

    This is a demonstration of the Phase V hackathon project featuring:
    - Event-driven architecture with Kafka
    - Dapr abstraction layer
    - 6 microservices (Backend, Recurring, Notification, Audit, WebSocket, Frontend)
    - Advanced features: Recurring tasks, Reminders, Real-time sync

    ---
    """)

    with gr.Tab("📋 Create Task"):
        gr.Markdown("### Create a New Task")
        with gr.Row():
            with gr.Column():
                task_title = gr.Textbox(label="Title", placeholder="Enter task title")
                task_desc = gr.Textbox(label="Description", placeholder="Enter task description", lines=3)
                task_priority = gr.Radio(["low", "medium", "high"], label="Priority", value="medium")
                task_due = gr.Textbox(label="Due Date", placeholder="2026-04-20T10:00:00Z")
                create_btn = gr.Button("Create Task", variant="primary")
            with gr.Column():
                create_output = gr.Textbox(label="Result", lines=10)

        create_btn.click(
            fn=create_task,
            inputs=[task_title, task_desc, task_priority, task_due],
            outputs=create_output
        )

    with gr.Tab("📝 View Tasks"):
        gr.Markdown("### All Tasks")
        view_btn = gr.Button("Refresh Tasks", variant="primary")
        tasks_output = gr.Markdown()

        view_btn.click(fn=get_tasks, outputs=tasks_output)

    with gr.Tab("🏥 Health Check"):
        gr.Markdown("### Backend Health Status")
        health_btn = gr.Button("Check Health", variant="primary")
        health_output = gr.Textbox(label="Health Status", lines=5)

        health_btn.click(fn=health_check, outputs=health_output)

    gr.Markdown("""
    ---

    ## 🏗️ Architecture

    - **Backend Service**: FastAPI with Dapr integration
    - **Recurring Service**: Handles recurring task generation
    - **Notification Service**: Sends reminders via Dapr Jobs API
    - **Audit Service**: Logs all events
    - **WebSocket Service**: Real-time updates
    - **Frontend**: Next.js with real-time sync

    ## 🔗 Links

    - **GitHub**: [umemasultan/Phase_5](https://github.com/umemasultan/Phase_5)
    - **Documentation**: See README.md in repository

    ---

    *Built with Spec-Driven Development | Phase V Hackathon 2026*
    """)

if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)
