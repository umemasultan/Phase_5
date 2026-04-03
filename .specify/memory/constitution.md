# Todo Application Constitution

## Core Principles

### I. Event-Driven Microservices
All services must be event-driven and follow microservice architecture principles. Services communicate via asynchronous events through Dapr PubSub with no tight coupling between services.

### II. Kafka Abstraction via Dapr PubSub
All messaging must go through Dapr PubSub building block. Zero direct Kafka client usage in business code. Dapr provides the abstraction layer over Kafka.

### III. Infrastructure Access via Dapr
All infrastructure services accessed via Dapr building blocks. Use Dapr for pubsub, state management, secrets, service invocation. Services remain cloud-agnostic through Dapr abstractions.

### IV. Async-First FastAPI
Backend services use FastAPI with async/await patterns. Non-blocking operations for better throughput. Event-driven responses instead of synchronous requests.

### V. Idempotent Consumers
All event consumers must be idempotent to handle duplicate events. Safe to process the same event multiple times without side effects. Design for at-least-once delivery semantics.

### VI. State Management
Services remain stateless where possible. State managed through Dapr state stores. 12-Factor App compliance for configuration.

### VII. Configuration Management
All configuration via environment variables. No hardcoded values in source code. Secrets managed through Dapr SecretStore.

## Security

### Secrets Management
Secrets must be stored in Kubernetes or Dapr SecretStore. No credentials in repository or source code. Environment-specific secrets handled externally.

### Isolation
Namespace isolation for different environments. mTLS enforced via Dapr for service-to-service communication. RBAC enforced for access control.

## Reliability

### Resilience Patterns
Retries enabled in Dapr for transient failures. Dead-letter topic strategy for failed message handling. Graceful shutdown handling in all services. Health endpoints required for all services.

## Performance

### Event Processing
No synchronous reminder logic in business services. No polling for reminders - use Dapr Jobs API for exact scheduling. Non-blocking event processing patterns.

## Observability

### Logging and Monitoring
Structured JSON logging in all services. Correlation IDs maintained per request across services. Readiness and Liveness probes required for Kubernetes. Metrics-ready architecture with standard observability patterns.

## Governance

Constitution supersedes all other practices. All PRs and reviews must verify compliance with these principles. Complexity must be justified against business requirements. Use CLAUDE.md for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2026-03-05 | **Last Amended**: 2026-04-02
