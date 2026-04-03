# Local Development Setup Guide

This guide will help you run the Todo application locally with all services.

## Prerequisites

Before starting, ensure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)
- [Dapr CLI](https://docs.dapr.io/getting-started/install-dapr-cli/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Python 3.11+](https://www.python.org/downloads/)

## Quick Start with Minikube (Recommended)

For the complete event-driven experience with Kafka and Dapr, use the Minikube deployment:

```bash
# Make the deployment script executable
chmod +x scripts/local-deploy.sh

# Run the local deployment
./scripts/local-deploy.sh
```

This will:
- Start Minikube with sufficient resources
- Install Dapr in your Kubernetes cluster
- Deploy Kafka using Strimzi
- Deploy all services with Dapr sidecars
- Expose the frontend via LoadBalancer

## Alternative: Local Development Mode

If you want to run services locally without Kubernetes, you can use the development script:

### On Windows:
```cmd
start-local-dev.bat
```

### On Linux/Mac:
```bash
chmod +x start-local-dev.sh
./start-local-dev.sh
```

⚠️ **Note**: Local development mode runs services without Dapr and Kafka, so event-driven functionality will be limited.

## Service URLs (Minikube Deployment)

Once deployed with Minikube, access the services at:

- **Frontend**: `minikube service frontend -n todo-prod --url`
- **Backend API**: `minikube service backend -n todo-prod --url`
- **Recurring Service**: `minikube service recurring -n todo-prod --url`
- **Notification Service**: `minikube service notification -n todo-prod --url`
- **Audit Service**: `minikube service audit -n todo-prod --url`
- **WebSocket Service**: `minikube service websocket -n todo-prod --url`

## Service URLs (Local Development Mode)

- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **Recurring Service**: [http://localhost:8001](http://localhost:8001)
- **Notification Service**: [http://localhost:8002](http://localhost:8002)
- **Audit Service**: [http://localhost:8003](http://localhost:8003)
- **WebSocket Service**: [http://localhost:8004](http://localhost:8004)

## Testing the API

You can test the backend API with curl:

```bash
# Create a task
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "This is a test task",
    "priority": "MEDIUM",
    "user_id": "test-user",
    "tags": ["test", "demo"]
  }'
```

## Stopping the Services

### For Minikube deployment:
```bash
minikube stop
```

To completely remove the cluster:
```bash
minikube delete
```

### For local development mode:
- Close each service's terminal window
- Or use Ctrl+C in each terminal where services are running

## Troubleshooting

1. **Services not starting**: Check that all prerequisites are installed
2. **Port conflicts**: Ensure ports 8000-8004 are available
3. **Docker issues**: Make sure Docker Desktop is running
4. **Minikube issues**: Try `minikube delete` and restart

## Next Steps

Once services are running, you can:
1. Access the frontend dashboard
2. Create tasks via the API
3. Test recurring tasks functionality
4. Validate event-driven behavior
5. Test real-time updates via WebSocket