# Advanced Todo Application

**Author**: Umema Sultan

This is a cloud-native, event-driven todo application built with microservices architecture using Dapr, Kafka, and Kubernetes.

## 🌟 Features

- **Advanced Task Management**: Recurring tasks, due dates, reminders
- **Priority & Tags**: Task prioritization and tagging system
- **Real-time Sync**: WebSocket-based live updates
- **Audit Trail**: Immutable event logging
- **Search & Filter**: Advanced task filtering and search
- **Event-driven**: Fully asynchronous architecture with Dapr
- **Cloud-native**: Deployable on any Kubernetes platform

## 🏗️ Architecture

- **Frontend**: Next.js application with real-time capabilities
- **Backend Services**:
  - Core API Service (FastAPI)
  - Recurring Task Service
  - Notification Service
  - Audit Service
  - WebSocket Service
- **Infrastructure**: Dapr + Kafka + PostgreSQL
- **Orchestration**: Kubernetes + Helm

## 🚀 Quick Start

### Prerequisites
- **For full deployment**: Docker Desktop (with Kubernetes enabled), kubectl, Helm, Dapr CLI, Minikube
- **For basic local development**: Python 3.11+, pip, virtual environment

### Local Deployment (Recommended)

1. **Start Docker Desktop** with Kubernetes enabled

2. **Run the application:**
   ```bash
   # On Windows:
   start-local-dev.bat

   # On Linux/Mac:
   chmod +x start-local-dev.sh
   ./start-local-dev.sh
   ```

3. **Alternatively, for Minikube deployment:**
   ```bash
   minikube start --memory=8192 --cpus=4
   dapr init -k
   chmod +x scripts/local-deploy.sh
   ./scripts/local-deploy.sh
   minikube service frontend -n todo-prod --url
   ```

## 📋 Configuration

### Environment Variables

The application uses the following environment variables:

- `DAPR_SIDECAR_HOST`: Dapr sidecar host (default: localhost)
- `DAPR_SIDECAR_PORT`: Dapr sidecar port (default: 3500)
- `DATABASE_URL`: PostgreSQL connection string
- `KAFKA_BROKERS`: Kafka broker addresses

## 🧪 Testing

### API Testing

```bash
# Create a task
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Task",
    "description": "Task description",
    "priority": "HIGH",
    "due_at": "2026-12-31T23:59:59Z",
    "user_id": "user-123",
    "tags": ["important", "work"]
  }'
```

### End-to-End Validation

Run the validation script:
```bash
chmod +x scripts/validate-e2e.sh
./scripts/validate-e2e.sh
```

## 🌐 Cloud Deployment

### AKS, GKE, OKE Deployment Templates

Deployment templates for major cloud providers are available in:
- `deploy/aks/`
- `deploy/gke/`
- `deploy/oke/`

## 🛠️ Technologies Used

- **Backend**: FastAPI, Python
- **Frontend**: Next.js, React
- **Message Queue**: Apache Kafka via Strimzi
- **Service Mesh**: Dapr
- **Database**: PostgreSQL
- **Orchestration**: Kubernetes, Helm
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus metrics, structured logging

## 📁 Project Structure

```
├── backend/                 # Core API service
├── frontend/                # Next.js frontend
├── recurring-service/       # Recurring task handler
├── notification-service/    # Notification processor
├── audit-service/           # Audit trail service
├── websocket-service/       # Real-time sync service
├── charts/                  # Helm charts
├── database/                # Database migrations
├── scripts/                 # Deployment and utility scripts
├── deploy/                  # Cloud-specific deployments
├── speckit.*               # SDD artifacts
└── README.md
```

## 🏗️ Spec-Driven Development

This project follows the Spec-Driven Development (SDD) methodology with the following artifacts:

- `speckit.constitution` - Architecture principles
- `speckit.specify` - Feature specifications
- `speckit.plan` - Architecture plan
- `speckit.tasks` - Implementation tasks

## 🚀 Production Ready

- [x] Event-driven architecture
- [x] Horizontal scaling
- [x] Health checks and monitoring
- [x] CI/CD pipeline
- [x] Secure deployment templates
- [x] Production validation checklist

## 🔧 Maintenance

For production maintenance, refer to the [PRODUCTION_VALIDATION_CHECKLIST.md](./PRODUCTION_VALIDATION_CHECKLIST.md).

## 📚 Further Reading

- [LOCAL_SETUP_GUIDE.md](./LOCAL_SETUP_GUIDE.md) - Local development setup
- [AGENTS.md](./AGENTS.md) - SDD enforcement guide

## 👤 Author

**Umema Sultan**

---

*Built with ❤️ using Spec-Driven Development methodology*