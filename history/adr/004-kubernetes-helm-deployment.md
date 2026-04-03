# ADR-004: Kubernetes Deployment with Helm

> **Scope**: Deployment strategy and infrastructure orchestration for production and local environments.

- **Status:** Accepted
- **Date:** 2026-04-02
- **Feature:** todo-app
- **Context:** Need production-ready deployment strategy that works across multiple cloud providers (AKS, GKE, OKE) and local development (Minikube).

## Decision

Use Kubernetes with Helm charts for deployment:
- **Orchestration**: Kubernetes for container orchestration
- **Package Management**: Helm charts for all services
- **Local Development**: Minikube with Dapr integration
- **Cloud Production**: Multi-cloud support (AKS, GKE, OKE)
- **Kafka**: Strimzi operator for Kubernetes-native Kafka

Chart structure:
- Individual charts per service (backend, frontend, recurring, etc.)
- Shared dapr-components chart
- Kafka chart with Strimzi operator
- Umbrella chart (todo-app) for full deployment

## Consequences

### Positive

- Cloud-agnostic deployment (works on any K8s cluster)
- Version-controlled infrastructure (Helm values)
- Easy rollbacks with Helm
- Environment parity (local Minikube matches production)
- Declarative configuration
- Built-in health checks and auto-scaling

### Negative

- Kubernetes complexity and learning curve
- Helm chart maintenance overhead
- Resource requirements for local development
- Debugging complexity in distributed environment
- Operational overhead (cluster management)

## Alternatives Considered

**Alternative A: Docker Compose Only**
- Simple docker-compose.yml for all environments
- Why rejected: Not production-ready, no orchestration, poor scaling

**Alternative B: Cloud-Specific Services (AWS ECS, Azure Container Apps)**
- Use managed container services
- Why rejected: Vendor lock-in, not multi-cloud

**Alternative C: Serverless (AWS Lambda, Azure Functions)**
- Deploy services as serverless functions
- Why rejected: Cold start latency, stateful services difficult, Kafka integration complex

**Alternative D: VM-Based Deployment**
- Deploy services on VMs with systemd
- Why rejected: Manual scaling, no container benefits, harder to manage

## References

- Feature Spec: specs/todo-app/spec.md
- Implementation Plan: specs/todo-app/plan.md (Kubernetes Architecture)
- Helm Charts: charts/
- Related ADRs: ADR-001 (Event-Driven Architecture), ADR-002 (Microservices)
