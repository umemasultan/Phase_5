# Critical Gaps and How to Fix Them

**Date:** 2026-04-15  
**Status:** Action Required Before Submission

---

## 🚨 GAP #1: Dapr Jobs API Not Implemented (CRITICAL)

### Current Problem
Your reminder system uses `asyncio.sleep()` which is a **polling-based approach** that violates the Phase V requirements.

**Current Code:** `backend/reminder/scheduler.py:24-26`
```python
await asyncio.sleep(delay_seconds)  # ❌ WRONG - This is polling
```

### Why This is Wrong
1. **Violates Constitution:** Line 98 states "No polling for reminders - use Dapr Jobs API"
2. **Not Production-Ready:** Sleep blocks the event loop
3. **Not Scalable:** Doesn't survive service restarts
4. **Documentation Requirement:** Phase V explicitly requires Dapr Jobs API

### ✅ How to Fix

**Step 1:** Update `backend/reminder/scheduler.py`
```python
import asyncio
from datetime import datetime, timezone
from dapr.clients import DaprClient
from dapr.clients.grpc._jobs import Job
import uuid

DAPR_PUBSUB_NAME = "pubsub"

async def schedule_reminder(task_id: str, remind_at: datetime, task_data: dict):
    """
    Schedule a reminder using Dapr Jobs API (not asyncio.sleep)
    """
    try:
        with DaprClient() as client:
            # Create a Dapr Job that fires at exact time
            job = Job(
                name=f"reminder-{task_id}",
                schedule=remind_at.isoformat(),  # ISO 8601 format
                data={
                    "task_id": task_id,
                    "title": task_data.get('title', ''),
                    "due_at": task_data.get('due_at'),
                    "remind_at": remind_at.isoformat(),
                    "user_id": task_data.get('user_id', '')
                }
            )
            
            # Schedule the job via Dapr
            await client.schedule_job_alpha1(job, overwrite=True)
            print(f"✅ Scheduled reminder job for task {task_id} at {remind_at}")
            
    except Exception as e:
        print(f"❌ Failed to schedule reminder: {str(e)}")
```

**Step 2:** Add job callback endpoint in `backend/src/main.py`
```python
@app.post("/api/jobs/reminder-callback")
async def handle_reminder_job(request: Request):
    """
    Dapr Jobs API calls this endpoint when the scheduled time arrives
    """
    job_data = await request.json()
    
    # Extract reminder data
    task_id = job_data.get("task_id")
    user_id = job_data.get("user_id")
    title = job_data.get("title")
    
    print(f"⏰ Reminder triggered for task {task_id}")
    
    # Publish reminder event to notification service
    reminder_event = ReminderEvent(
        id=str(uuid.uuid4()),
        task_id=task_id,
        title=title,
        due_at=job_data.get("due_at"),
        remind_at=job_data.get("remind_at"),
        user_id=user_id
    )
    
    with DaprClient() as client:
        await client.publish_event(
            pubsub_name=DAPR_PUBSUB_NAME,
            topic_name="reminder-events",
            data=reminder_event.json()
        )
    
    return {"status": "SUCCESS"}
```

**Step 3:** Update Dapr component to enable Jobs API

Create `charts/dapr-components/templates/jobs-config.yaml`:
```yaml
apiVersion: dapr.io/v1alpha1
kind: Configuration
metadata:
  name: dapr-config
  namespace: todo-prod
spec:
  features:
    - name: JobsAlpha
      enabled: true
```

**Estimated Time:** 30 minutes

---

## 🚨 GAP #2: Dapr Secrets Component Missing (MEDIUM)

### Current Problem
No Dapr SecretStore component configured. Secrets are hardcoded in YAML files.

**Evidence:** `charts/dapr-components/templates/` only has 2 files (pubsub, state)

### Why This is Wrong
1. **Security Risk:** Database passwords in plain YAML
2. **Documentation Requirement:** Phase V requires "Use Dapr for secrets"
3. **Constitution Violation:** Line 76 states "Secrets must be stored in Dapr SecretStore"

### ✅ How to Fix

**Step 1:** Create `charts/dapr-components/templates/secrets-kubernetes.yaml`
```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: kubernetes-secrets
  namespace: todo-prod
spec:
  type: secretstores.kubernetes
  version: v1
  metadata:
    - name: vaultName
      value: "todo-secrets"
```

**Step 2:** Create Kubernetes secret
```bash
kubectl create secret generic todo-secrets \
  --from-literal=database-password=dapr-secret \
  --from-literal=kafka-password=kafka-secret \
  --namespace=todo-prod
```

**Step 3:** Update `state-postgres.yaml` to use secrets
```yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
  namespace: todo-prod
spec:
  type: state.postgresql
  version: v1
  metadata:
  - name: connectionString
    secretKeyRef:
      name: database-connection
      key: connectionString
auth:
  secretStore: kubernetes-secrets
```

**Estimated Time:** 20 minutes

---

## 🚨 GAP #3: CI/CD Deployment Script Incomplete (MEDIUM)

### Current Problem
`.github/workflows/deploy.yml:259-264` has placeholder script

```yaml
run: |
  echo "Deployment script would go here"  # ❌ Not functional
```

### ✅ How to Fix

Replace lines 259-264 in `.github/workflows/deploy.yml`:
```yaml
    - name: Deploy to Kubernetes
      env:
        KUBECONFIG: ${{ secrets.KUBECONFIG }}
      run: |
        # Install Dapr if not present
        dapr init -k || true
        
        # Create namespaces
        kubectl create namespace todo-prod --dry-run=client -o yaml | kubectl apply -f -
        kubectl create namespace kafka --dry-run=client -o yaml | kubectl apply -f -
        
        # Deploy Kafka
        helm upgrade --install kafka charts/kafka \
          --namespace kafka \
          --wait --timeout 10m
        
        # Deploy Dapr components
        helm upgrade --install dapr-components charts/dapr-components \
          --namespace todo-prod \
          --wait
        
        # Deploy application
        helm upgrade --install todo-app charts/todo-app \
          --namespace todo-prod \
          --set backend.image.tag=${{ github.sha }} \
          --set frontend.image.tag=${{ github.sha }} \
          --set recurring.image.tag=${{ github.sha }} \
          --set notification.image.tag=${{ github.sha }} \
          --set audit.image.tag=${{ github.sha }} \
          --set websocket.image.tag=${{ github.sha }} \
          --wait --timeout 10m
        
        echo "✅ Deployment completed successfully"
```

**Note:** You'll need to add `KUBECONFIG` secret to GitHub repository settings.

**Estimated Time:** 15 minutes

---

## 🚨 GAP #4: Frontend WebSocket Integration Missing (LOW)

### Current Problem
Backend WebSocket service exists but frontend doesn't connect to it.

**Evidence:** No WebSocket client code in `frontend/src/`

### ✅ How to Fix

**Step 1:** Create `frontend/src/contexts/WebSocketContext.js`
```javascript
import { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const [ws, setWs] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    // Connect to WebSocket service
    const websocket = new WebSocket('ws://localhost:8004/ws');
    
    websocket.onopen = () => {
      console.log('✅ WebSocket connected');
    };
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('📨 WebSocket message:', data);
      setLastMessage(data);
    };
    
    websocket.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };
    
    websocket.onclose = () => {
      console.log('🔌 WebSocket disconnected');
    };
    
    setWs(websocket);
    
    return () => {
      websocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, lastMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
```

**Step 2:** Update `frontend/src/pages/_app.js`
```javascript
import { WebSocketProvider } from '../contexts/WebSocketContext';

function MyApp({ Component, pageProps }) {
  return (
    <WebSocketProvider>
      <Component {...pageProps} />
    </WebSocketProvider>
  );
}

export default MyApp;
```

**Step 3:** Use WebSocket in `frontend/src/pages/tasks.js`
```javascript
import { useWebSocket } from '../contexts/WebSocketContext';

export default function Tasks() {
  const { lastMessage } = useWebSocket();
  
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'task_update') {
      // Refresh tasks when update received
      fetchTasks();
    }
  }, [lastMessage]);
  
  // ... rest of component
}
```

**Estimated Time:** 30 minutes

---

## 📊 TOTAL TIME TO FIX ALL GAPS

| Gap | Priority | Time | Complexity |
|-----|----------|------|------------|
| #1 Dapr Jobs API | CRITICAL | 30 min | Medium |
| #2 Secrets Component | MEDIUM | 20 min | Easy |
| #3 CI/CD Script | MEDIUM | 15 min | Easy |
| #4 WebSocket Frontend | LOW | 30 min | Easy |
| **TOTAL** | - | **95 min** | - |

---

## 🎯 RECOMMENDED EXECUTION ORDER

### Session 1: Critical Fixes (45 minutes)
1. Fix Dapr Jobs API (#1) - 30 min
2. Add Secrets Component (#2) - 20 min

### Session 2: Polish (50 minutes)
3. Complete CI/CD Script (#3) - 15 min
4. Add WebSocket Frontend (#4) - 30 min
5. Test everything - 5 min

---

## ✅ VERIFICATION CHECKLIST

After fixing each gap, verify:

### Gap #1 Verification
```bash
# Check if Dapr Jobs API is being called
kubectl logs -n todo-prod -l app=backend | grep "Scheduled reminder job"
```

### Gap #2 Verification
```bash
# Check if secrets component exists
kubectl get component kubernetes-secrets -n todo-prod
```

### Gap #3 Verification
```bash
# Trigger GitHub Actions and check deployment
# Should see actual Helm commands, not "would go here"
```

### Gap #4 Verification
```bash
# Open browser console on tasks page
# Should see "✅ WebSocket connected"
```

---

## 📝 NOTES

1. **Gap #1 is CRITICAL** - Without Dapr Jobs API, you're not meeting Phase V requirements
2. **Gap #2 is IMPORTANT** - Security best practice and explicit requirement
3. **Gap #3 is REQUIRED** - For automated deployment
4. **Gap #4 is NICE-TO-HAVE** - Real-time sync works via polling as fallback

---

## 🚀 AFTER FIXING

Once all gaps are fixed:
1. Commit changes to GitHub
2. Deploy to Oracle Cloud OKE (free tier)
3. Record 90-second demo video
4. Submit to hackathon

**Your project will then be 100% Phase V compliant!**

---

*Generated by Claude Code - Phase V Compliance Analysis*
