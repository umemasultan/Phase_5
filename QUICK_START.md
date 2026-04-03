# 🚀 Quick Start Guide

## Option 1: Standalone Mode (No Docker - Fastest)

Perfect for quick testing without Docker/Dapr dependencies.

### Steps:
1. **Run the standalone script:**
   ```bash
   start-standalone.bat
   ```

2. **Access the API:**
   - Backend: http://localhost:8000
   - API Docs: http://localhost:8000/docs
   - Health: http://localhost:8000/health

3. **Test with curl:**
   ```bash
   # Health check
   curl http://localhost:8000/health

   # Create a task
   curl -X POST http://localhost:8000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Test Task\",\"user_id\":\"user1\",\"description\":\"My first task\"}"

   # List tasks
   curl http://localhost:8000/tasks?user_id=user1
   ```

### Limitations:
- No event-driven features (Kafka)
- No recurring tasks
- No notifications
- No audit trail
- In-memory storage only (data lost on restart)

---

## Option 2: Full Docker Mode (Complete Features)

Includes all microservices, Kafka, PostgreSQL, and event-driven architecture.

### Prerequisites:
1. **Install Docker Desktop:**
   - Download from: https://www.docker.com/products/docker-desktop
   - Install and start Docker Desktop
   - Ensure Docker is running (check system tray icon)

2. **Verify Docker:**
   ```bash
   docker --version
   docker ps
   ```

### Steps:
1. **Start Docker Desktop** (wait for it to fully start)

2. **Run the full stack:**
   ```bash
   start-local-dev.bat
   ```

3. **Wait for services to start** (30-60 seconds)

4. **Access services:**
   - Backend API: http://localhost:8000
   - Recurring Service: http://localhost:8001
   - Notification Service: http://localhost:8002
   - Audit Service: http://localhost:8003
   - WebSocket Service: http://localhost:8004

5. **View logs:**
   ```bash
   docker-compose -f docker-compose-no-frontend.yml logs -f
   ```

6. **Stop services:**
   ```bash
   docker-compose -f docker-compose-no-frontend.yml down
   ```

### Features Available:
- ✅ Full event-driven architecture
- ✅ Kafka message streaming
- ✅ PostgreSQL persistence
- ✅ Recurring task scheduling
- ✅ Real-time notifications
- ✅ Audit trail logging
- ✅ WebSocket real-time updates

---

## Troubleshooting

### Docker Issues:
- **"Docker daemon not running"**: Start Docker Desktop and wait for it to fully initialize
- **Port conflicts**: Stop other services using ports 8000-8004, 5432, 9092, 2181
- **Build failures**: Run `docker system prune -a` to clean up, then retry

### Python Issues:
- **"Python not found"**: Install Python 3.8+ from python.org
- **Import errors**: Run `pip install -r backend/requirements.txt`

### Network Issues:
- **Connection refused**: Wait 30 seconds after starting services
- **Timeout errors**: Check Docker Desktop is running and has enough resources (4GB+ RAM recommended)

---

## Next Steps

1. **Test the API** using the interactive docs at http://localhost:8000/docs
2. **Create tasks** via the API
3. **Monitor logs** to see event-driven communication
4. **Explore the codebase** to understand the architecture

For production deployment, see `PRODUCTION_VALIDATION_CHECKLIST.md`.
