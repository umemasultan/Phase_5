# AGENTS.md - Spec-Driven Development Enforcement Guide

This file contains the execution methodology for Spec-Driven Development (SDD). All development follows the strict SDD cycle:

**Constitution > Specify > Plan > Tasks > Implement**

## ENFORCEMENT MODE: TRUE

### Core Principles
- No task execution without corresponding entry in speckit.tasks
- No code changes without referencing speckit.specify
- No architecture drift from speckit.plan
- All work must align with principles in speckit.constitution

### Validation Requirements
- All features must be specifiable in speckit.specify before implementation
- All technical approaches must be planned in speckit.plan before coding
- All implementation must follow tasks defined in speckit.tasks
- Architecture must remain consistent with speckit.constitution

### Enforcement Rules
1. **Constitution Compliance**: All decisions must align with architectural principles
2. **Specification Adherence**: Features must match speckit.specify requirements
3. **Plan Following**: Implementation must follow speckit.plan architecture
4. **Task Validation**: Each implementation step must correspond to speckit.tasks

### Workflow Stages
1. **Constitution** - Define non-negotiable architectural principles
2. **Specify** - Define what needs to be built
3. **Plan** - Define how it will be built
4. **Tasks** - Break down implementation into atomic steps
5. **Implement** - Execute tasks sequentially with validation

### Deviation Protocol
If architecture drift is detected:
1. STOP current implementation
2. Update speckit.plan to reflect new approach
3. Update speckit.specify if requirements changed
4. Update speckit.tasks to reflect new tasks
5. RESUME implementation following updated artifacts

### Validation Checklist
- [ ] All 4 SDD artifacts exist (constitution, specify, plan, tasks)
- [ ] All implementation references appropriate artifacts
- [ ] No direct Kafka client usage (must use Dapr)
- [ ] All infrastructure accessed via Dapr building blocks
- [ ] Event-driven architecture maintained
- [ ] Async-first patterns followed