# Kubernetes Manifests for FCC BizFin Logo Designer

## Overview

These manifests deploy the FCC Business & Finance Club Logo Designer application to a k3s cluster using FluxCD GitOps workflow.

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Internet                                       │
└────────────┬────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────┐
│  Cloudflare Tunnel                              │
│  business-logo.inherent.design                  │
│  business-logo.api.inherent.design              │
└────────────┬────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────┐
│  Traefik Ingress Controller                     │
│  Routes based on hostname                       │
└────────────┬────────────────────────────────────┘
             │
       ┌─────┴─────┐
       ↓           ↓
┌─────────┐  ┌─────────┐
│   Web   │  │   API   │
│ Service │  │ Service │
│  (80)   │  │ (3001)  │
└────┬────┘  └────┬────┘
     │            │
     ↓            ↓
┌─────────┐  ┌─────────┐
│  Web    │  │  API    │
│  Pods   │  │  Pods   │
│  (x2)   │  │  (x2)   │
└─────────┘  └─────────┘
```

## Components

### Namespace

- **File:** `namespace.yaml`
- **Name:** `fcc-bizfin-logo-designer`
- **Purpose:** Isolate logo designer resources

### Web Frontend

- **Files:** `web-deployment.yaml`, `web-service.yaml`
- **Image:** `ghcr.io/inherent-design/fcc-bizfin-logo-designer-web:main`
- **Replicas:** 2 (for HA)
- **Port:** 80
- **Resources:**
  - Requests: 256Mi RAM, 100m CPU
  - Limits: 512Mi RAM, 500m CPU
- **Probes:** Liveness + Readiness on `/`

### API Backend

- **Files:** `api-deployment.yaml`, `api-service.yaml`
- **Image:** `ghcr.io/inherent-design/fcc-bizfin-logo-designer-api:main`
- **Replicas:** 2 (for HA)
- **Port:** 3001
- **Resources:**
  - Requests: 128Mi RAM, 50m CPU
  - Limits: 256Mi RAM, 250m CPU
- **Probes:** Liveness + Readiness on `/health`

### Ingress

- **File:** `ingress.yaml`
- **Hostnames:**
  - `business-logo.inherent.design` → web service
  - `business-logo.api.inherent.design` → api service
- **TLS:** Enabled via Traefik

## Deployment via FluxCD

### Prerequisites

1. k3s cluster running
2. FluxCD installed and configured
3. Git repository for cluster config
4. Cloudflared tunnel configured
5. GitHub Container Registry access

### Bootstrap

```bash
# Clone cluster config repo
cd ~/production
git clone git@github.com:inherent-design/k3s-cluster-config.git
cd k3s-cluster-config

# Copy manifests to FluxCD directory
mkdir -p clusters/luminode/apps/fcc-bizfin-logo-designer
cp ~/production/fcc-biz-fin-club/development/logo-designer/k8s/*.yaml \
   clusters/luminode/apps/fcc-bizfin-logo-designer/

# Commit and push
git add clusters/luminode/apps/fcc-bizfin-logo-designer/
git commit -m "feat: deploy fcc-bizfin logo designer"
git push

# FluxCD auto-deploys within 1 minute
```

### Verify Deployment

```bash
# Check namespace
kubectl get namespace fcc-bizfin-logo-designer

# Check pods
kubectl -n fcc-bizfin-logo-designer get pods

# Check services
kubectl -n fcc-bizfin-logo-designer get svc

# Check ingress
kubectl -n fcc-bizfin-logo-designer get ingress

# View logs
kubectl -n fcc-bizfin-logo-designer logs -l app=fcc-bizfin-logo-designer-web
kubectl -n fcc-bizfin-logo-designer logs -l app=fcc-bizfin-logo-designer-api

# Check FluxCD reconciliation
flux get kustomizations --watch
```

### Access Application

- **Web:** https://business-logo.inherent.design
- **API:** https://business-logo.api.inherent.design

## Manual Deployment (Testing)

For testing before FluxCD:

```bash
# Apply all manifests
kubectl apply -f namespace.yaml
kubectl apply -f web-deployment.yaml
kubectl apply -f web-service.yaml
kubectl apply -f api-deployment.yaml
kubectl apply -f api-service.yaml
kubectl apply -f ingress.yaml

# Or apply entire directory
kubectl apply -f .
```

## Scaling

```bash
# Scale web frontend
kubectl -n fcc-bizfin-logo-designer scale deployment/fcc-bizfin-logo-designer-web --replicas=3

# Scale API backend
kubectl -n fcc-bizfin-logo-designer scale deployment/fcc-bizfin-logo-designer-api --replicas=3

# For permanent scaling, edit deployment YAML and commit to git
```

## Updates

### Image Updates

```bash
# Edit deployment YAML, change image tag
# Example: main → v1.2.3
vim web-deployment.yaml
# Change: image: ghcr.io/.../web:v1.2.3

git add web-deployment.yaml
git commit -m "chore: update web image to v1.2.3"
git push

# FluxCD auto-deploys new image
# k8s performs rolling update (zero downtime)
```

### Configuration Updates

```bash
# Edit deployment env vars
vim web-deployment.yaml

git add web-deployment.yaml
git commit -m "config: update API URL"
git push

# FluxCD auto-applies changes
```

## Node Affinity

Both deployments use `nodeSelector: role: compute` to:

- Avoid scheduling on provisioner node (laptop)
- Target always-on compute nodes

Pod anti-affinity spreads replicas across nodes for HA.

## Troubleshooting

### Pods not starting

```bash
# Check pod status
kubectl -n fcc-bizfin-logo-designer get pods

# Describe pod for events
kubectl -n fcc-bizfin-logo-designer describe pod <pod-name>

# View logs
kubectl -n fcc-bizfin-logo-designer logs <pod-name>

# Common issues:
# - ImagePullBackOff: Check GHCR credentials
# - CrashLoopBackOff: Check application logs
# - Pending: Check node resources (kubectl top nodes)
```

### Ingress not routing

```bash
# Check ingress status
kubectl -n fcc-bizfin-logo-designer get ingress -o wide

# Check Traefik logs
kubectl -n kube-system logs -l app.kubernetes.io/name=traefik

# Verify cloudflared tunnel config
cat ~/production/vps-backup/cloudflared/config.yml
```

### Service not reachable

```bash
# Check service endpoints
kubectl -n fcc-bizfin-logo-designer get endpoints

# Port-forward for testing
kubectl -n fcc-bizfin-logo-designer port-forward svc/fcc-bizfin-logo-designer-web 8080:80

# Access: http://localhost:8080
```

## Resource Limits

Total resources per replica:

**Web Pod:**

- Requests: 256Mi RAM, 100m CPU
- Limits: 512Mi RAM, 500m CPU

**API Pod:**

- Requests: 128Mi RAM, 50m CPU
- Limits: 256Mi RAM, 250m CPU

**Total (2 replicas each):**

- Requests: 768Mi RAM, 300m CPU
- Limits: 1536Mi RAM, 1500m CPU

Ensure nodes have sufficient capacity.

## Future Enhancements

- [ ] Add PersistentVolumeClaim for user uploads
- [ ] Add HorizontalPodAutoscaler for auto-scaling
- [ ] Add NetworkPolicy for pod-to-pod security
- [ ] Add PodDisruptionBudget for controlled drains
- [ ] Add Prometheus ServiceMonitor for metrics
- [ ] Add SOPS-encrypted database credentials

---

**Last Updated:** 2025-12-06
**Dependencies:** k3s, FluxCD, Traefik, Cloudflared
