@echo off
echo 🚀 Starting Todo App with Docker Compose...

REM Check if Docker is installed and running
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed or not in PATH. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker daemon is running
docker ps >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker daemon is not running. Please start Docker Desktop first.
    echo    Or run: docker run hello-world
    pause
    exit /b 1
)

echo ✅ Docker is available and running

REM Check if docker-compose is available
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Docker Compose not found. Trying 'docker compose' (v2 syntax)...
    docker compose version >nul 2>&1
    if errorlevel 1 (
        echo ❌ Neither 'docker-compose' nor 'docker compose' found.
        pause
        exit /b 1
    ) else (
        echo ✅ Docker Compose (v2) is available
        set COMPOSE_CMD=docker compose
    )
) else (
    echo ✅ Docker Compose (v1) is available
    set COMPOSE_CMD=docker-compose
)

echo.
echo 🔄 Building and starting services with Docker Compose...
echo    This will start all services: Kafka, PostgreSQL, Backend, Recurring, Notification, Audit, WebSocket
echo.

REM Start the services in detached mode
%COMPOSE_CMD% -f docker-compose-no-frontend.yml up --build -d

if errorlevel 1 (
    echo ❌ Failed to start services with Docker Compose
    pause
    exit /b 1
)

echo ✅ Services are starting up in the background...
echo.
echo 🌐 Services will be available shortly:
echo    - Backend API: http://localhost:8000
echo    - Kafka: localhost:9092 (for internal service communication)
echo    - PostgreSQL: localhost:5432 (for internal service communication)
echo    - Recurring Service: http://localhost:8001
echo    - Notification Service: http://localhost:8002
echo    - Audit Service: http://localhost:8003
echo    - WebSocket Service: http://localhost:8004
echo.
echo 📋 To view service logs: %COMPOSE_CMD% -f docker-compose-no-frontend.yml logs -f
echo 📋 To stop services: %COMPOSE_CMD% -f docker-compose-no-frontend.yml down
echo.
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak >nul

%COMPOSE_CMD% -f docker-compose-no-frontend.yml ps

echo.
echo ✅ Todo App is now running with full event-driven architecture!
echo    The system includes Kafka for messaging, PostgreSQL for data storage,
echo    and all microservices communicating via the event-driven pattern.
echo.
echo 💡 Tip: To test the API, you can use curl or Postman to send requests to http://localhost:8000
echo.

pause