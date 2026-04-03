# ADR-001: Event-Driven Architecture with Dapr and Kafka

> **Scope**: Core architectural pattern for microservices communication and infrastructure abstraction.

- **Status:** Accepted
- **Date:** 2026-04-02
- **Feature:** todo-app
- **Context:** Building a scalable, cloud-native todo application requiring asynchronous task processing, recurring task generation, reminder scheduling, and real-time synchronization across multiple services.

## Decision

Adopt event-driven microservices architecture using:
- **Messaging**: Apache Kafka for event streaming
- **Abstraction Layer**: Dapr building blocks (pubsub, state, secrets, service invocation)
- **Communication Pattern**: Asynchronous event-based communication
- **State Management**: Dapr state stores with PostgreSQL backend
- **No Direct Kafka Usage**: All Kafka interactions through Dapr pubsub component

## Consequences

### Positive

- Cloud-agnostic architecture through Dapr abstraction
- Horizontal scalability for all services
- Loose coupling between microservices
- Resilience through async communication and retry patterns
- Easy to swap infrastructure providers (Kafka → Redis, PostgreSQL → MongoDB)
- Built-in observability and tracing via Dapr
- Simplified service-to-service communication

### Negative

- Additional complexity with Dapr sidecar pattern
- Learning curve for Dapr building blocks
- Increased operational overhead (managing Dapr runtime)
- Potential latency from sidecar communication
- Debugging complexity across distributed services

## Alternatives Considered

**Alternative A: Direct Kafka + REST APIs**
- Direct Kafka client libraries in each service
- Synchronous REST APIs for service communication
- Why rejected: Tight coupling to Kafka, no cloud portability, complex retry logic

**Alternative B: Message Queue (RabbitMQ) + gRPC**
- RabbitMQ for messaging
- gRPC for service-to-service calls
- Why rejected: Less scalable than Kafka for high-throughput events, gRPC adds complexity

**Alternative C: Monolithic Architecture**
- Single service with all functionality
- Direct database access
- Why rejected: Poor scalability, tight coupling, difficult to maintain

## References

- Feature Spec: specs/todo-app/spec.md
- Implementation Plan: specs/todo-app/plan.md
- Related ADRs: ADR-002 (Microservices Decomposition)
- Constitution: speckit.constitution
