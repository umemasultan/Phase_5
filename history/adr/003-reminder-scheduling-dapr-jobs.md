# ADR-003: Reminder Scheduling with Dapr Jobs API

> **Scope**: Exact-time task reminder scheduling without polling.

- **Status:** Accepted
- **Date:** 2026-04-02
- **Feature:** todo-app
- **Context:** Need to schedule reminders at exact times (remind_at timestamps) without polling the database. Must be efficient, scalable, and accurate.

## Decision

Use Dapr Jobs API for reminder scheduling:
- Schedule jobs with exact UTC timestamps
- Jobs trigger callbacks that publish reminder events
- No polling loops or cron-based checks
- Notification service consumes reminder events

Flow:
1. User sets remind_at on task
2. Backend schedules Dapr Job for that exact time
3. At remind_at, Dapr triggers callback
4. Callback publishes ReminderEvent to pubsub
5. Notification service consumes and sends notification

## Consequences

### Positive

- No polling overhead (CPU/database efficient)
- Exact-time execution (not "check every N minutes")
- Scalable (Dapr handles job distribution)
- Idempotent (can reschedule without duplicates)
- Cloud-agnostic (Dapr abstraction)

### Negative

- Dependency on Dapr Jobs API stability
- Requires Dapr runtime configuration
- Job state managed externally (not in app database)
- Debugging scheduled jobs requires Dapr tooling

## Alternatives Considered

**Alternative A: Database Polling with Cron**
- Cron job checks database every minute for due reminders
- Why rejected: Inefficient, not exact-time, scales poorly

**Alternative B: In-Memory Scheduler (asyncio.sleep)**
- Python asyncio.sleep() to wait until remind_at
- Why rejected: Lost on service restart, not distributed

**Alternative C: External Scheduler (Celery Beat)**
- Celery with Redis backend for task scheduling
- Why rejected: Additional infrastructure, tight coupling to Celery

**Alternative D: Cloud Provider Schedulers (AWS EventBridge)**
- Use cloud-native scheduling services
- Why rejected: Vendor lock-in, not cloud-agnostic

## References

- Feature Spec: specs/todo-app/spec.md (A2. Due Dates & Reminders)
- Implementation Plan: specs/todo-app/plan.md
- Implementation: backend/reminder/scheduler.py
- Related ADRs: ADR-001 (Event-Driven Architecture)
