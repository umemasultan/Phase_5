# 🚀 DEPLOYMENT GUIDE - Aapko Kya Karna Hai

**Date:** April 15, 2026  
**Time:** 03:16 AM

---

## ✅ MAINE KYA KAR DIYA HAI

### 1. Deployment Script Bana Di Hai ✅
**File:** `deploy-to-oracle-cloud.sh`

Yeh script automatically:
- Namespaces banayegi
- Dapr install karegi
- Kafka deploy karegi
- Database setup karegi
- Sab services deploy karegi
- Public URL degi

---

## 🎯 AB AAPKO KYA KARNA HAI (Step-by-Step)

### **PART 1: Oracle Cloud Setup (Aap Khud Karoge - 30 minutes)**

#### Step 1: Oracle Cloud Account Banao (10 min)

1. **Is link par jao:**
   ```
   https://www.oracle.com/cloud/free/
   ```

2. **"Start for free" button dabao**

3. **Form bharo:**
   - Email address
   - Password
   - Country: Pakistan
   - Phone number

4. **Credit card add karo** (charge NAHI hoga, sirf verification)

5. **Email verify karo**

6. **Login karo:** https://cloud.oracle.com/

---

#### Step 2: OKE Cluster Banao (15 min)

1. **Oracle Cloud Console mein login karo**

2. **Hamburger menu (☰) kholo** (top left)

3. **Developer Services → Kubernetes Clusters (OKE)** par jao

4. **"Create Cluster" button dabao**

5. **"Quick Create" select karo**

6. **Details bharo:**
   ```
   Name: todo-cluster
   Kubernetes Version: v1.28.2 (latest)
   Visibility Type: Public
   Shape: VM.Standard.E2.1.Micro (FREE TIER)
   Number of nodes: 2
   ```

7. **"Next" → "Create Cluster" dabao**

8. **Wait karo** (10-15 minutes lagenge)
   - Status "Active" hone tak wait karo

---

#### Step 3: Cloud Shell Kholo (2 min)

1. **Oracle Console mein** (top right corner)

2. **Developer Tools icon (>_) dabao**

3. **Cloud Shell khulega** (terminal)

---

#### Step 4: kubectl Configure Karo (3 min)

**Cloud Shell mein yeh commands chalo:**

```bash
# 1. Cluster ID nikalo
oci ce cluster list --compartment-id <your-compartment-id>

# 2. Kubeconfig setup karo
oci ce cluster create-kubeconfig \
  --cluster-id <your-cluster-id> \
  --file $HOME/.kube/config \
  --region <your-region> \
  --token-version 2.0.0

# 3. Test karo
kubectl get nodes
```

**Output aisa dikhna chahiye:**
```
NAME                        STATUS   ROLES   AGE
oke-node-1                  Ready    node    5m
oke-node-2                  Ready    node    5m
```

---

### **PART 2: Deployment Script Chalao (Main Ne Banayi Hai - 20 minutes)**

#### Step 5: GitHub Repo Clone Karo

**Cloud Shell mein:**

```bash
# 1. Home directory mein jao
cd ~

# 2. Repo clone karo
git clone https://github.com/umemasultan/Phase_5.git

# 3. Directory mein jao
cd Phase_5

# 4. Script ko executable banao
chmod +x deploy-to-oracle-cloud.sh
```

---

#### Step 6: Deployment Script Chalao

```bash
# Script run karo
./deploy-to-oracle-cloud.sh
```

**Yeh script automatically:**
- ✅ Namespaces banayegi
- ✅ Dapr install karegi
- ✅ Kafka deploy karegi (5-10 min)
- ✅ Database setup karegi
- ✅ Backend deploy karegi
- ✅ Frontend deploy karegi
- ✅ Public URLs degi

**Total time:** 15-20 minutes

---

#### Step 7: Public URL Nikalo

**Script complete hone ke baad:**

```bash
# URLs check karo
kubectl get svc -n todo-prod

# Ya specific IPs nikalo
kubectl get svc frontend -n todo-prod -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
kubectl get svc backend -n todo-prod -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

**Output:**
```
NAME       TYPE           EXTERNAL-IP      PORT(S)
frontend   LoadBalancer   123.45.67.89     3000:30123/TCP
backend    LoadBalancer   123.45.67.90     8000:30124/TCP
```

**Aapka URL:**
```
Frontend: http://123.45.67.89:3000
Backend:  http://123.45.67.90:8000
```

---

### **PART 3: Demo Video Banao (Aap Khud Karoge - 30 minutes)**

#### Option 1: Loom (Sabse Aasan)

1. **Loom.com par jao**
2. **Free account banao**
3. **Chrome extension install karo**
4. **Record button dabao:**
   - Screen + Camera select karo
   - Browser mein app kholo
   - Features dikhao
   - 90 seconds mein complete karo
5. **Link copy karo**

---

#### Option 2: OBS Studio (Better Quality)

1. **OBS download karo:** https://obsproject.com/
2. **Screen capture setup karo**
3. **Microphone enable karo**
4. **Record karo** (90 seconds)
5. **MP4 export karo**
6. **YouTube par upload karo** (unlisted)

---

#### Option 3: Phone Se (Quick)

1. **Screen recording start karo**
2. **Browser mein app kholo**
3. **Features dikhao**
4. **Voice-over karo**
5. **Google Drive par upload karo**

---

#### Demo Video Script (Exactly Yeh Bolo):

```
[0-15s]
"Hello! Main Umema Sultan hoon. Yeh mera Phase V Todo Application 
hai with advanced cloud deployment on Oracle Cloud OKE."

[15-30s]
"Architecture: Event-driven microservices with Dapr abstraction.
6 services - Backend, Recurring, Notification, Audit, WebSocket, 
Frontend. Kafka via Strimzi."

[30-50s]
"Features demo: Creating a recurring task with high priority...
Setting reminder... Real-time sync via WebSocket...
Recurring task automatically generates next occurrence."

[50-70s]
"Technical: Dapr Jobs API for reminders, Dapr Secrets for security,
Complete CI/CD with GitHub Actions, Deployed on Oracle Cloud OKE
with Kubernetes and Helm."

[70-85s]
"Built using Spec-Driven Development. All artifacts in specs folder.
Production-ready architecture."

[85-90s]
"Thank you! Code on GitHub: github.com/umemasultan/Phase_5"
```

---

### **PART 4: Submit Karo (5 minutes)**

**Yeh 4 cheezein submit karni hain:**

1. ✅ **GitHub URL:**
   ```
   https://github.com/umemasultan/Phase_5
   ```

2. **Deployed App URL:**
   ```
   http://[your-oracle-ip]:3000
   ```

3. **Demo Video Link:**
   ```
   https://youtu.be/[your-video-id]
   Ya
   https://drive.google.com/file/d/[your-file-id]
   ```

4. **WhatsApp Number:**
   ```
   +92-XXX-XXXXXXX
   ```

---

## ⏰ TIMELINE

```
Abhi (03:16 AM) ────────────────────────► Done (05:30 AM)

├─ Oracle Account (10m) ─────────────────┤ ← Aap karoge
├─ OKE Cluster (15m) ────────────────────┤ ← Aap karoge
├─ Cloud Shell + kubectl (5m) ───────────┤ ← Aap karoge
├─ Script Run (20m) ─────────────────────┤ ← Automatic (maine banayi)
├─ Test App (5m) ────────────────────────┤ ← Aap karoge
├─ Record Video (30m) ───────────────────┤ ← Aap karoge
└─ Submit (5m) ──────────────────────────► ← Aap karoge

Total: ~2 hours
```

---

## 🆘 AGAR PROBLEM AAYE

### Problem 1: OKE Cluster nahi ban raha
**Solution:**
- Free tier shape select karo: VM.Standard.E2.1.Micro
- Region change karo (US East, US West try karo)

### Problem 2: kubectl connect nahi ho raha
**Solution:**
```bash
# Kubeconfig phir se setup karo
oci ce cluster create-kubeconfig --cluster-id <id>

# Test
kubectl cluster-info
```

### Problem 3: Script error de rahi hai
**Solution:**
```bash
# Dapr manually install karo
curl -fsSL https://raw.githubusercontent.com/dapr/cli/master/install/install.sh | bash
dapr init -k

# Phir script phir se run karo
./deploy-to-oracle-cloud.sh
```

### Problem 4: LoadBalancer IP nahi mil raha
**Solution:**
```bash
# 2-3 minutes wait karo, phir check karo
kubectl get svc -n todo-prod

# Ya NodePort use karo
kubectl patch svc frontend -n todo-prod -p '{"spec":{"type":"NodePort"}}'
```

---

## ✅ CHECKLIST

**Aapko yeh karna hai:**

- [ ] Oracle Cloud account banao
- [ ] OKE cluster banao
- [ ] Cloud Shell kholo
- [ ] kubectl configure karo
- [ ] Repo clone karo
- [ ] Script run karo (`./deploy-to-oracle-cloud.sh`)
- [ ] Public URL nikalo
- [ ] Browser mein test karo
- [ ] Demo video record karo (90 seconds)
- [ ] Submit karo (4 cheezein)

---

## 📝 IMPORTANT NOTES

1. **Script maine bana di hai** ✅
   - File: `deploy-to-oracle-cloud.sh`
   - Automatic deployment
   - Sab kuch setup karega

2. **Aapko sirf Oracle Cloud setup karna hai**
   - Account banao
   - Cluster banao
   - Script run karo

3. **Video 90 seconds se zyada nahi**
   - Script upar di hai
   - Copy-paste kar ke bolo

4. **Submission mein 4 cheezein chahiye**
   - GitHub URL ✅ (already done)
   - Deployed URL (script se milega)
   - Video link (record karne ke baad)
   - WhatsApp number

---

## 🎯 SUMMARY

**Maine kya kiya:**
- ✅ Deployment script bana di
- ✅ Step-by-step guide likhi
- ✅ Demo video script di
- ✅ Troubleshooting guide di

**Aapko kya karna hai:**
1. Oracle Cloud account banao (10 min)
2. OKE cluster banao (15 min)
3. Script run karo (20 min automatic)
4. Video banao (30 min)
5. Submit karo (5 min)

**Total time:** ~2 hours

---

## 🚀 START KARO!

**Pehla step:**
```
https://www.oracle.com/cloud/free/
```

**Questions ho to poochein!** 🎉

---

*Guide created: April 15, 2026 (03:16 AM)*  
*Deployment script: deploy-to-oracle-cloud.sh*
