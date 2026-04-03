# ADR-005: Frontend Stack with Next.js and Real-Time WebSocket

> **Scope**: Frontend technology stack and real-time synchronization strategy.

- **Status:** Accepted
- **Date:** 2026-04-02
- **Feature:** todo-app
- **Context:** Need modern, responsive frontend with real-time task synchronization across multiple clients. Must support advanced UI features (search, filter, sort, tags, priorities).

## Decision

Frontend stack:
- **Framework**: Next.js 14 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Custom CSS with enterprise SaaS theme (#0F2854 primary color)
- **Real-Time**: WebSocket connection to websocket-service
- **State Management**: React Context for global state
- **API Communication**: Fetch API for REST calls to backend

Architecture:
- Pages: dashboard, tasks, audit
- Components: TaskCard, PriorityBadge, TagChip, FilterPanel, SearchBar
- WebSocket provider for real-time updates
- Optimistic UI updates for responsiveness

## Consequences

### Positive

- Modern React features (hooks, server components)
- SEO-friendly with SSR capabilities
- Fast development with hot reload
- Real-time sync without polling
- Responsive UI with optimistic updates
- Easy deployment (Vercel, Docker, K8s)

### Negative

- Next.js learning curve for team
- WebSocket connection management complexity
- State synchronization challenges
- Bundle size considerations
- Client-side JavaScript required

## Alternatives Considered

**Alternative A: React SPA (Vite + React Router)**
- Client-side only React application
- Why rejected: No SSR, worse SEO, more complex routing

**Alternative B: Vue.js + Nuxt**
- Vue ecosystem with Nuxt framework
- Why rejected: Team familiarity with React, smaller ecosystem

**Alternative C: Svelte + SvelteKit**
- Compiled framework with smaller bundle
- Why rejected: Less mature ecosystem, team learning curve

**Alternative D: Polling Instead of WebSocket**
- Poll backend every N seconds for updates
- Why rejected: Inefficient, not real-time, higher server load

## References

- Feature Spec: specs/todo-app/spec.md (A8. Real-Time Sync)
- Implementation Plan: specs/todo-app/plan.md (HIGH-LEVEL UI ARCHITECTURE)
- Frontend Code: frontend/src/
- Related ADRs: ADR-001 (Event-Driven Architecture)
