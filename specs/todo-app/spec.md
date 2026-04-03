# Todo Application Specification

## SECTION A — ADVANCED FEATURES

### A1. Recurring Tasks
- Support daily, weekly, monthly recurrence patterns
- On completion of recurring task → publish `task.completed` event
- Recurring Service automatically generates next occurrence
- Must prevent duplicate task generation
- Must handle timezone considerations properly
- **Acceptance Criteria**: Async processing, event-based, fully tested

### A2. Due Dates & Reminders
- User can set `due_at` and `remind_at` timestamps
- Backend schedules Dapr Job with exact UTC time
- On trigger → publish reminder event to notification system
- Notification service consumes and handles reminders
- **Acceptance Criteria**: No polling, exact-time execution, no duplicate reminders

### A3. Priorities
- ENUM values: LOW, MEDIUM, HIGH
- Tasks sortable by priority
- Priority badge visible in UI

### A4. Tags
- Many-to-many relationship between tasks and tags
- Tasks filterable by tags
- Tags searchable

### A5. Search
- Partial text search across task titles and descriptions
- Combined search with filters (tags, priority, due date)

### A6. Sort
- Sort by due_at (ascending/descending)
- Sort by priority (ascending/descending)
- Sort by created_at (ascending/descending)

### A7. Audit Trail
- Immutable event log for all task operations
- Stored separately from main task data
- Queryable audit trail service

### A8. Real-Time Sync
- Publish task update events to WebSocket service
- WebSocket Service broadcasts changes to connected clients
- Multi-client consistency maintained

## SECTION B — EVENT SCHEMA DEFINITIONS

### TaskEvent Schema
```json
{
  "id": "uuid",
  "event_type": "string",
  "task_id": "uuid",
  "payload": "object",
  "user_id": "uuid",
  "timestamp": "ISO 8601 datetime",
  "version": "semver string"
}
```

### ReminderEvent Schema
```json
{
  "id": "uuid",
  "task_id": "uuid",
  "title": "string",
  "due_at": "ISO 8601 datetime",
  "remind_at": "ISO 8601 datetime",
  "user_id": "uuid"
}
```

### Versioning Strategy
- Event versioning follows semantic versioning (major.minor.patch)
- Major version changes require backward compatibility handling
- Consumers must handle multiple versions gracefully

## SECTION C — ACCEPTANCE CRITERIA

### Functional Requirements
- [ ] All features work asynchronously through event-driven architecture
- [ ] Dapr PubSub used for all messaging (no direct Kafka calls)
- [ ] Recurring tasks generate properly without duplicates
- [ ] Reminders fire at exact scheduled times (no polling)
- [ ] Priority and tag features fully implemented
- [ ] Search and filter work as specified
- [ ] Real-time sync works across multiple clients

### Non-Functional Requirements
- [ ] 99.9% uptime for critical services
- [ ] <100ms response time for API calls
- [ ] Handle 1000+ concurrent WebSocket connections
- [ ] Graceful degradation when services are unavailable
- [ ] Proper error handling and logging throughout

### Security Requirements
- [ ] All sensitive data encrypted at rest and in transit
- [ ] Proper authentication and authorization for all endpoints
- [ ] Secrets managed through Dapr SecretStore
- [ ] No hardcoded credentials in codebase

### Performance Requirements
- [ ] No polling-based operations
- [ ] Efficient event processing
- [ ] Proper resource utilization in Kubernetes
- [ ] Horizontal scaling capabilities
