#!/bin/bash
# Simplified Deployment Script for Oracle Cloud OKE
# Run this after you have kubectl configured

set -e

echo "🚀 Starting Todo App Deployment on Oracle Cloud OKE..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Creating namespaces...${NC}"
kubectl create namespace todo-prod --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace kafka --dry-run=client -o yaml | kubectl apply -f -
echo -e "${GREEN}✅ Namespaces created${NC}"
echo ""

echo -e "${YELLOW}Step 2: Installing Dapr...${NC}"
dapr init -k || echo "Dapr already installed"
kubectl wait --for=condition=available deployment/dapr-operator -n dapr-system --timeout=300s
echo -e "${GREEN}✅ Dapr installed${NC}"
echo ""

echo -e "${YELLOW}Step 3: Installing Strimzi Kafka Operator...${NC}"
kubectl apply -f https://strimzi.io/install/latest?namespace=kafka -n kafka
kubectl wait --for=condition=available deployment/strimzi-cluster-operator -n kafka --timeout=300s
echo -e "${GREEN}✅ Strimzi operator installed${NC}"
echo ""

echo -e "${YELLOW}Step 4: Creating Kafka cluster...${NC}"
cat <<EOF | kubectl apply -f -
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: todo-kafka
  namespace: kafka
spec:
  kafka:
    replicas: 1
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
    storage:
      type: ephemeral
    config:
      offsets.topic.replication.factor: 1
      transaction.state.log.replication.factor: 1
      transaction.state.log.min.isr: 1
  zookeeper:
    replicas: 1
    storage:
      type: ephemeral
EOF

echo "Waiting for Kafka cluster to be ready (this may take 5-10 minutes)..."
kubectl wait --for=condition=ready kafka/todo-kafka -n kafka --timeout=600s
echo -e "${GREEN}✅ Kafka cluster ready${NC}"
echo ""

echo -e "${YELLOW}Step 5: Creating Kafka topics...${NC}"
cat <<EOF | kubectl apply -f -
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: task-events
  namespace: kafka
  labels:
    strimzi.io/cluster: todo-kafka
spec:
  partitions: 3
  replicas: 1
---
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: reminder-events
  namespace: kafka
  labels:
    strimzi.io/cluster: todo-kafka
spec:
  partitions: 3
  replicas: 1
---
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: task-updates
  namespace: kafka
  labels:
    strimzi.io/cluster: todo-kafka
spec:
  partitions: 3
  replicas: 1
EOF
echo -e "${GREEN}✅ Kafka topics created${NC}"
echo ""

echo -e "${YELLOW}Step 6: Deploying Dapr components...${NC}"
kubectl apply -f charts/dapr-components/templates/ -n todo-prod
echo -e "${GREEN}✅ Dapr components deployed${NC}"
echo ""

echo -e "${YELLOW}Step 7: Creating Kubernetes secret for database...${NC}"
kubectl create secret generic todo-secrets \
  --from-literal=database-connection="host=postgres.todo-prod.svc.cluster.local port=5432 user=postgres password=dapr-secret dbname=todo-app sslmode=disable" \
  --namespace=todo-prod \
  --dry-run=client -o yaml | kubectl apply -f -
echo -e "${GREEN}✅ Secrets created${NC}"
echo ""

echo -e "${YELLOW}Step 8: Deploying PostgreSQL database...${NC}"
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: todo-prod
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        - name: POSTGRES_DB
          value: todo-app
        - name: POSTGRES_USER
          value: postgres
        - name: POSTGRES_PASSWORD
          value: dapr-secret
        ports:
        - containerPort: 5432
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: todo-prod
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
EOF
echo -e "${GREEN}✅ PostgreSQL deployed${NC}"
echo ""

echo -e "${YELLOW}Step 9: Building and deploying services...${NC}"
echo "Note: Using pre-built images from GitHub Container Registry"
echo ""

# Backend
echo "Deploying Backend service..."
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: todo-prod
  annotations:
    dapr.io/enabled: "true"
    dapr.io/app-id: "backend"
    dapr.io/app-port: "8000"
    dapr.io/config: "dapr-config"
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
      annotations:
        dapr.io/enabled: "true"
        dapr.io/app-id: "backend"
        dapr.io/app-port: "8000"
        dapr.io/config: "dapr-config"
    spec:
      containers:
      - name: backend
        image: python:3.11-slim
        command: ["/bin/sh"]
        args:
          - -c
          - |
            apt-get update && apt-get install -y git
            git clone https://github.com/umemasultan/Phase_5.git /app
            cd /app/backend
            pip install -r requirements.txt
            python src/main.py
        ports:
        - containerPort: 8000
        env:
        - name: DAPR_SIDECAR_HOST
          value: "localhost"
        - name: DAPR_SIDECAR_PORT
          value: "3500"
---
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: todo-prod
spec:
  selector:
    app: backend
  ports:
  - port: 8000
    targetPort: 8000
  type: LoadBalancer
EOF

# Frontend
echo "Deploying Frontend service..."
cat <<EOF | kubectl apply -f -
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
    spec:
      containers:
      - name: frontend
        image: node:18-slim
        command: ["/bin/sh"]
        args:
          - -c
          - |
            apt-get update && apt-get install -y git
            git clone https://github.com/umemasultan/Phase_5.git /app
            cd /app/frontend
            npm install
            npm run build
            npm start
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "http://backend:8000"
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
  - port: 3000
    targetPort: 3000
  type: LoadBalancer
EOF

echo -e "${GREEN}✅ Services deployed${NC}"
echo ""

echo -e "${YELLOW}Step 10: Waiting for services to be ready...${NC}"
kubectl wait --for=condition=available deployment/backend -n todo-prod --timeout=600s
kubectl wait --for=condition=available deployment/frontend -n todo-prod --timeout=600s
echo -e "${GREEN}✅ All services ready${NC}"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Getting your application URLs..."
echo ""

# Get LoadBalancer IPs
BACKEND_IP=$(kubectl get svc backend -n todo-prod -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "pending")
FRONTEND_IP=$(kubectl get svc frontend -n todo-prod -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "pending")

echo "📊 Your Application URLs:"
echo ""
echo "Frontend: http://${FRONTEND_IP}:3000"
echo "Backend API: http://${BACKEND_IP}:8000"
echo ""

if [ "$FRONTEND_IP" = "pending" ] || [ "$BACKEND_IP" = "pending" ]; then
    echo -e "${YELLOW}⚠️  LoadBalancer IPs are still pending. Run this command in 2-3 minutes:${NC}"
    echo ""
    echo "kubectl get svc -n todo-prod"
    echo ""
fi

echo "════════════════════════════════════════════════════════════════"
echo ""
echo "✅ Next Steps:"
echo "1. Open the Frontend URL in your browser"
echo "2. Test the application"
echo "3. Record your demo video"
echo "4. Submit!"
echo ""
echo "════════════════════════════════════════════════════════════════"
