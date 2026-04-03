#!/bin/bash

# Local deployment script for Todo App
# This script sets up the entire system on Minikube with Dapr

set -e  # Exit on any error

echo "🚀 Starting local deployment of Todo App..."

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Check if helm is installed
if ! command -v helm &> /dev/null; then
    echo "❌ helm is not installed. Please install helm first."
    exit 1
fi

# Check if minikube is installed
if ! command -v minikube &> /dev/null; then
    echo "❌ minikube is not installed. Please install minikube first."
    exit 1
fi

# Check if dapr cli is installed
if ! command -v dapr &> /dev/null; then
    echo "❌ dapr CLI is not installed. Please install Dapr CLI first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Start minikube if it's not running
MINIKUBE_STATUS=$(minikube status --format='{{.Host}}')
if [ "$MINIKUBE_STATUS" != "Running" ]; then
    echo "🔄 Starting Minikube..."
    minikube start --memory=8192 --cpus=4
fi

echo "✅ Minikube is running"

# Enable Dapr in Kubernetes
echo "🔄 Initializing Dapr in Kubernetes..."
dapr init -k
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=dapr-operator --timeout=300s --namespace=dapr-system

echo "✅ Dapr initialized in Kubernetes"

# Create the todo-prod namespace
echo "🔄 Creating todo-prod namespace..."
kubectl create namespace todo-prod --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace kafka --dry-run=client -o yaml | kubectl apply -f -

echo "✅ Namespaces created"

# Apply Kafka components first (Strimzi operator and cluster)
echo "🔄 Installing Kafka with Strimzi..."
kubectl apply -f charts/kafka/templates/strimzi-operator.yaml
kubectl wait --for=condition=available deployment/strimzi-cluster-operator -n kafka --timeout=300s

kubectl apply -f charts/kafka/templates/kafka-cluster.yaml
kubectl apply -f charts/kafka/templates/topics.yaml

# Wait for Kafka cluster to be ready
kubectl wait --for=condition=ready kafka/todo-kafka-cluster -n kafka --timeout=600s

echo "✅ Kafka cluster is ready"

# Apply Dapr components
echo "🔄 Applying Dapr components..."
kubectl apply -f charts/dapr-components/templates/pubsub-kafka.yaml
kubectl apply -f charts/dapr-components/templates/state-postgres.yaml

echo "✅ Dapr components applied"

# Build and push local Docker images
echo "🔄 Building Docker images..."
eval $(minikube docker-env)
docker build -f Dockerfile.backend -t todo-backend:latest .
docker build -f Dockerfile.recurring -t todo-recurring:latest .
docker build -f Dockerfile.notification -t todo-notification:latest .
docker build -f Dockerfile.audit -t todo-audit:latest .
docker build -f Dockerfile.websocket -t todo-websocket:latest .
docker build -f Dockerfile.frontend -t todo-frontend:latest .

echo "✅ Docker images built"

# Deploy all services using Helm
echo "🔄 Deploying services with Helm..."

# Backend service
helm upgrade --install backend charts/backend --namespace todo-prod --set image.repository=todo-backend --set image.tag=latest

# Recurring service
helm upgrade --install recurring charts/recurring --namespace todo-prod --set image.repository=todo-recurring --set image.tag=latest

# Notification service
helm upgrade --install notification charts/notification --namespace todo-prod --set image.repository=todo-notification --set image.tag=latest

# Audit service
helm upgrade --install audit charts/audit --namespace todo-prod --set image.repository=todo-audit --set image.tag=latest

# WebSocket service
helm upgrade --install websocket charts/websocket --namespace todo-prod --set image.repository=todo-websocket --set image.tag=latest

# Frontend service (if we had a complete chart for it)
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: todo-prod
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
      annotations:
        dapr.io/enabled: "true"
        dapr.io/app-id: "todo-frontend"
        dapr.io/app-port: "3000"
        dapr.io/config: "dapr-config"
    spec:
      containers:
      - name: frontend
        image: todo-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "http://backend.todo-prod.svc.cluster.local:80"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: todo-prod
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
EOF

echo "✅ All services deployed"

# Wait for all pods to be ready
echo "🔄 Waiting for all pods to be ready..."
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=backend -n todo-prod --timeout=300s
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=recurring -n todo-prod --timeout=300s
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=notification -n todo-prod --timeout=300s
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=audit -n todo-prod --timeout=300s
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=websocket -n todo-prod --timeout=300s

echo "✅ All pods are ready"

# Get the frontend service URL
FRONTEND_URL=$(minikube service frontend -n todo-prod --url)
echo "🎉 Todo App is deployed!"
echo "🌐 Frontend URL: $FRONTEND_URL"
echo "📋 You can now access your Todo application"

echo "🧪 Running basic validation tests..."

# Test backend health
BACKEND_URL=$(minikube service backend -n todo-prod --url)
if curl -f $BACKEND_URL/ 2>/dev/null; then
    echo "✅ Backend service is responding"
else
    echo "⚠️ Backend service might have issues"
fi

echo "✅ Local deployment completed successfully!"
echo ""
echo "💡 Next steps:"
echo "   - Access the application at: $FRONTEND_URL"
echo "   - Check pod status: kubectl get pods -n todo-prod"
echo "   - View logs: kubectl logs -l app=backend -n todo-prod"
echo "   - To stop: minikube stop"
echo "   - To delete: minikube delete"