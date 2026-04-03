#!/bin/bash

# Local development startup script
# This script starts all services locally for development

echo "🚀 Starting Todo App in local development mode..."

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.11+ first."
    exit 1
fi

# Check if pip is available
if ! command -v pip &> /dev/null; then
    echo "❌ pip is not available. Please install pip."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create a virtual environment
echo "🔄 Creating virtual environment..."
python -m venv todo-app-env

# Activate virtual environment
source todo-app-env/Scripts/activate

# Install dependencies for all services
echo "🔄 Installing dependencies..."

cd backend
pip install -r requirements.txt
cd ..

cd recurring-service
pip install -r requirements.txt
cd ..

cd notification-service
pip install -r requirements.txt
cd ..

cd audit-service
pip install -r requirements.txt
cd ..

cd websocket-service
pip install -r requirements.txt
cd ..

echo "✅ Dependencies installed"

# Start services in background
echo "🔄 Starting services..."

# Start backend service
cd backend/src
echo "Starting backend service on port 8000..."
python -m uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ../..

# Start recurring service
cd recurring-service/src
echo "Starting recurring service on port 8001..."
python -m uvicorn main:app --host 0.0.0.0 --port 8001 &
RECURRING_PID=$!
cd ../..

# Start notification service
cd notification-service/src
echo "Starting notification service on port 8002..."
python -m uvicorn main:app --host 0.0.0.0 --port 8002 &
NOTIFICATION_PID=$!
cd ../..

# Start audit service
cd audit-service/src
echo "Starting audit service on port 8003..."
python -m uvicorn main:app --host 0.0.0.0 --port 8003 &
AUDIT_PID=$!
cd ../..

# Start websocket service
cd websocket-service/src
echo "Starting websocket service on port 8004..."
python -m uvicorn main:app --host 0.0.0.0 --port 8004 &
WEBSOCKET_PID=$!
cd ../..

echo "✅ All services started successfully!"

echo ""
echo "🌐 Services are now running:"
echo "   - Backend API: http://localhost:8000"
echo "   - Recurring Service: http://localhost:8001"
echo "   - Notification Service: http://localhost:8002"
echo "   - Audit Service: http://localhost:8003"
echo "   - WebSocket Service: http://localhost:8004"
echo ""
echo "💡 Note: This is a local development setup without Dapr or Kafka."
echo "   For full event-driven functionality, use the Minikube deployment script:"
echo "   sh scripts/local-deploy.sh"
echo ""
echo "🔄 To stop all services, run: kill $BACKEND_PID $RECURRING_PID $NOTIFICATION_PID $AUDIT_PID $WEBSOCKET_PID"
echo ""

# Keep the script running
wait $BACKEND_PID $RECURRING_PID $NOTIFICATION_PID $AUDIT_PID $WEBSOCKET_PID