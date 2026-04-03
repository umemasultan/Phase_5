# ADR-002: Microservices Decomposition Strategy

> **Scope**: Service boundaries and responsibilities for the todo application microservices.

- **Status:** Accepted
- **Date:** 2026-04-02
- **Feature:** todo-app
- **Context:** Need to decompose the todo application into independently deployable services that handle specific business capabilities while maintaining loose coupling.

## Decision

Decompose into six specialized microservices:
- **Backend API Service**: Core CRUD operations, task management, API gateway
- **Recurring Service**: Consumes task.completed events, generates next occurrences
- **Notification Service**: Consumes reminder events, sends notifications
- **Audit Service**: Consumes all events, maintains immutable audit log
- **WebSocket Service**: Real-time broadcasting to connected clients
- **Frontend Service**: Next.js application with UI and WebSocket client

Each service:
- Owns its domain logic
- Communicates via events (no direct service calls)
- Maintains its own state via Dapr
- Scales independently

## Consequences

### Positive

- Clear separation of concerns
- Independent scaling per service
- Fault isolation (one service failure doesn't cascade)
- Team autonomy for service ownership
- Technology flexibility per service
- Easier testing and deployment

### Negative

- Increased deployment complexity
- Distributed system challenges (eventual consistency)
- More infrastructure to manage
- Network latency between services
- Debugging across service boundaries

## Alternatives Considered

**Alternative A: Modular Monolith**
- Single deployment with internal modules
- Shared database
- Why rejected: Scaling limitations, deployment coupling

**Alternative B: Fewer Services (3 services)**
- Combine recurring + notification + audit into one "worker" service
- Why rejected: Loses independent scaling, mixed responsibilities

**Alternative C: More Services (10+ services)**
- Further decompose (separate tag service, priority service, etc.)
- Why rejected: Over-engineering, unnecessary complexity for current scale

## References

- Feature Spec: specs/todo-app/spec.md
- Implementation Plan: specs/todo-app/plan.md
- Related ADRs: ADR-001 (Event-Driven Architecture)
- Constitution: speckit.constitution
