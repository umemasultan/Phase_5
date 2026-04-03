# Todo Application Architecture Plan

## KUBERNETES ARCHITECTURE

### Namespaces
- `todo-prod` - Main application services
- `kafka` - Kafka cluster and related components
- `dapr-system` - Dapr system components

### Services Architecture
- `frontend` - Next.js frontend application with WebSocket support
- `backend` - FastAPI backend service with MCP integration
- `recurring-service` - Handles recurring task generation
- `notification-service` - Processes reminder events and notifications
- `audit-service` - Maintains immutable audit logs
- `websocket-service` - Real-time broadcasting to connected clients

### Pod Configuration
Each service runs as:
- Application container (service-specific)
- Dapr sidecar container (for building block access)

### Kafka Options
- Local: Strimzi Kafka Operator for development
- Cloud: Redpanda Cloud OR Confluent for production
- Must work via Dapr abstraction layer only

## DAPR BUILDING BLOCKS

### Component Configuration
- `pubsub.kafka` - Event pub/sub for all messaging
- `state.postgresql` - State management for service state
- `secretstores.kubernetes` - Secret management
- `jobs API` - For scheduling exact-time tasks (reminders)
- `service invocation` - Internal service communication

## DATA FLOW DIAGRAM (TEXTUAL)

```
Client → Frontend → Dapr → Backend
Backend → Dapr PubSub → Kafka → Consumer Services
Reminder Event → Dapr Jobs → Callback → PubSub → Notification Service
WebSocket Service → Broadcast → Connected Clients
```

## DATABASE ARCHITECTURE

### Primary Database
- Neon Postgres (cloud-hosted PostgreSQL)
- Connection via Dapr state store component
- Migration strategy using Flyway or similar

### Migration Strategy
- Versioned SQL migration files
- Applied via Kubernetes Job during deployment
- Rollback capability for each migration

## HELM STRUCTURE
```
charts/
  backend/
    templates/
    Chart.yaml
    values.yaml
  frontend/
    templates/
    Chart.yaml
    values.yaml
  recurring/
    templates/
    Chart.yaml
    values.yaml
  notification/
    templates/
    Chart.yaml
    values.yaml
  audit/
    templates/
    Chart.yaml
    values.yaml
  websocket/
    templates/
    Chart.yaml
    values.yaml
  kafka/
    templates/
    Chart.yaml
    values.yaml
  dapr-components/
    templates/
    Chart.yaml
    values.yaml
```

## CI/CD PIPELINE

### GitHub Actions Workflow
- Build Docker images for each service
- Push to container registry
- Helm upgrade --install to target environment
- Environment-specific configuration values
- Automated testing at each stage

## HIGH-LEVEL UI ARCHITECTURE

### Frontend Stack
- Next.js App Router for modern routing
- React Query or SWR for data fetching and caching
- WebSocket provider for real-time updates

### Pages Structure
- `/dashboard` - Main dashboard with task overview
- `/tasks` - Task list with search, filter, sort
- `/tasks/[id]` - Individual task detail view
- `/audit` - Audit trail viewer

### Components
- `TaskCard` - Display individual tasks with metadata
- `TaskForm` - Create/edit task form
- `PriorityBadge` - Visual indicator for priority levels
- `TagChip` - Interactive tag components
- `RecurringIndicator` - Shows recurrence pattern
- `CountdownTimer` - Shows time until due/reminder
- `FilterPanel` - Advanced filtering options
- `SearchBar` - Text search functionality
- `SortDropdown` - Sorting controls
- `NotificationToast` - User notifications
- `WebSocketProvider` - Real-time connection management

### UX Requirements
- Optimistic updates for responsive UI
- Real-time sync with server state
- Loading skeletons during data fetching
- Error boundaries for graceful error handling

### Theme Design
- Primary: #0F2854 (dark blue)
- Minimal enterprise SaaS style
- Dark-mode compatible design system

## DEPLOYMENT STRATEGY

### Local Development
- Minikube with Dapr integration
- Local Kafka via Strimzi
- Development environment parity

### Cloud Production
- Multiple cloud provider options (AKS, GKE, OKE)
- Production-grade security and monitoring
- Auto-scaling based on load
- Blue-green deployment strategy

## MONITORING AND OBSERVABILITY

### Logging
- Structured JSON logging in all services
- Centralized log aggregation (ELK or similar)
- Log correlation across services

### Metrics
- Prometheus metrics for all services
- Dapr-sidecar metrics
- Application-specific business metrics

### Tracing
- Distributed tracing with Jaeger/Zipkin
- Request correlation across service boundaries
- Performance bottleneck identification

## SECURITY IMPLEMENTATION

### Authentication
- JWT-based authentication
- OAuth2 integration capability
- Session management via Dapr

### Authorization
- Role-Based Access Control (RBAC)
- Resource-level permissions
- API rate limiting

### Network Security
- mTLS for service-to-service communication
- Network policies for namespace isolation
- Ingress controller with SSL termination
