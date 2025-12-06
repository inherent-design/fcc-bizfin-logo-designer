# Logo Designer - Deployment Guide

This guide covers deploying the Logo Designer monorepo to Coolify with separate web and API applications.

## Architecture Overview

```
Internet → Cloudflare Tunnel (cloudflared) → VPS (luminode.inherent.design)
                                               ├─ Web App (port 3000)
                                               ├─ API Server (port 3001)
                                               └─ Postgres DB (port 5432)
```

### Services

1. **Web App** (`@logo-designer/web`)
   - Vite + React + TypeScript
   - Nginx in production
   - Domain: `fcc-business.inherent.design`
   - Port: `3000`

2. **API Server** (`@logo-designer/api`)
   - Fastify + TypeScript
   - Node.js runtime
   - Domain: `fcc-business-api.inherent.design`
   - Port: `3001`

3. **Database**
   - PostgreSQL 16
   - Port: `5432`

## Prerequisites

- VPS with Coolify installed (luminode.inherent.design)
- Cloudflare account with domain configured
- Cloudflare Tunnel (cloudflared) installed as system service
- Git repository access

## 1. Cloudflare Tunnel Setup

The cloudflared service runs as a **system service** (not in Coolify) to access localhost services.

### Install cloudflared (if not already done)

```bash
# On Ubuntu/Debian
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Login to Cloudflare
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create fcc-business

# Note the tunnel ID from output
```

### Configure Tunnel

Edit `/etc/cloudflared/config.yml`:

```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  # Coolify dashboard
  - hostname: luminode.inherent.design
    service: http://localhost:8000

  # Documentation (if applicable)
  - hostname: docs.inherent.design
    service: http://localhost:3010

  # Logo Designer Web App
  - hostname: fcc-business.inherent.design
    service: http://localhost:3000

  # Logo Designer API
  - hostname: fcc-business-api.inherent.design
    service: http://localhost:3001

  # Catch-all
  - service: http_status:404
```

### Install and Start Service

```bash
# Install as system service
sudo cloudflared service install

# Start service
sudo systemctl start cloudflared

# Enable on boot
sudo systemctl enable cloudflared

# Check status
sudo systemctl status cloudflared

# View logs
sudo journalctl -u cloudflared -f
```

### Verify Routes

```bash
# Check service logs
sudo journalctl -u cloudflared -n 50 --no-pager

# List tunnel info
cloudflared tunnel info YOUR_TUNNEL_ID

# Check Cloudflare Zero Trust dashboard
# Navigate to: Access → Tunnels → Your tunnel name
```

### Configure DNS

In Cloudflare Dashboard:

1. Go to your domain's DNS settings
2. Add CNAME records (if not auto-created):
   - `fcc-business` → `YOUR_TUNNEL_ID.cfargotunnel.com`
   - `fcc-business-api` → `YOUR_TUNNEL_ID.cfargotunnel.com`

## 2. Coolify Application Setup

You'll create **2 separate Coolify applications** from the same Git repository.

### Application 1: Web App

1. **Create New Resource** → Docker Compose / Dockerfile
2. **Configuration:**
   - **Name:** `Logo Designer Web`
   - **Git Repository:** Your repo URL
   - **Branch:** `main`
   - **Base Directory:** `/apps/web` ⚠️ **IMPORTANT**
   - **Dockerfile Location:** `Dockerfile` (relative to base directory)
   - **Build Context:** `/` (root of repository) ⚠️ **REQUIRED for pnpm workspace**
   - **Publish Directory:** Not needed (using Dockerfile)

3. **Port Configuration:**
   - **Internal Port:** `80` (nginx serves on port 80 inside container)
   - **External Port:** `3000` (static, configured in Coolify)

4. **Environment Variables:**

   ```
   VITE_API_URL=https://fcc-business-api.inherent.design
   NODE_ENV=production
   ```

5. **Health Check:**
   - Path: `/health`
   - Port: `80`
   - Interval: `30s`

6. **Domain:**
   - Leave empty or set to custom domain (not needed with cloudflared)

### Application 2: API Server

1. **Create New Resource** → Docker Compose / Dockerfile
2. **Configuration:**
   - **Name:** `Logo Designer API`
   - **Git Repository:** Same repo URL
   - **Branch:** `main`
   - **Base Directory:** `/apps/api` ⚠️ **IMPORTANT**
   - **Dockerfile Location:** `Dockerfile`
   - **Build Context:** `/` (root of repository) ⚠️ **REQUIRED for pnpm workspace**

3. **Port Configuration:**
   - **Internal Port:** `3000` (Fastify default in Dockerfile)
   - **External Port:** `3001` (static, configured in Coolify)

4. **Environment Variables:**

   ```
   PORT=3000
   HOST=0.0.0.0
   NODE_ENV=production
   CORS_ORIGIN=https://fcc-business.inherent.design
   DATABASE_URL=postgresql://user:password@db-host:5432/logodb
   ```

   ⚠️ **Update `DATABASE_URL` with your actual Postgres credentials**

5. **Health Check:**
   - Path: `/health`
   - Port: `3000`
   - Interval: `30s`

6. **Domain:**
   - Leave empty (cloudflared handles routing)

### Why Base Directory + Build Context?

The monorepo structure requires:

- **Base Directory:** Tells Coolify which app to deploy
- **Build Context: `/`**: Required for pnpm to access `pnpm-workspace.yaml` at repo root
- Dockerfiles use `--filter @logo-designer/web...` to install only needed dependencies

## 3. Database Setup

### Option A: Coolify Postgres Service

1. Create new Postgres service in Coolify
2. Set persistent storage
3. Note connection details
4. Update API app's `DATABASE_URL` environment variable

### Option B: External Managed Postgres

1. Use managed service (AWS RDS, DigitalOcean, etc.)
2. Update API app's `DATABASE_URL` environment variable
3. Ensure network access from VPS

### Database Initialization

After deploying API app:

```bash
# SSH into VPS
ssh root@luminode.inherent.design

# Get API container ID
docker ps | grep logo-designer-api

# Run migrations (once implemented)
docker exec -it <container-id> npm run migrate

# Or access Postgres directly
docker exec -it <postgres-container> psql -U logouser -d logodb
```

## 4. Local Development

### Prerequisites

- Docker and Docker Compose
- pnpm 10.20.0+
- Node.js 20+

### Setup

1. **Clone repository:**

   ```bash
   git clone <repo-url>
   cd logo-designer
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Create environment file:**

   ```bash
   cp .env.example .env.local
   ```

4. **Start services with Docker Compose:**

   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

   This starts:
   - Web app on `http://localhost:3000`
   - API server on `http://localhost:3001`
   - Postgres on `localhost:5432`

5. **Or run without Docker (bare metal):**

   ```bash
   # Start Postgres separately
   # Update apps/api/.env with DATABASE_URL

   # Terminal 1: API
   pnpm dev:api

   # Terminal 2: Web
   pnpm dev:web
   ```

6. **Access the app:**
   - Web: http://localhost:3000
   - API: http://localhost:3001
   - API Health: http://localhost:3001/health

### Development Commands

```bash
# Run all apps in parallel
pnpm dev

# Run specific app
pnpm dev:web
pnpm dev:api

# Build all apps
pnpm build

# Build specific app
pnpm build:web
pnpm build:api

# Lint and format
pnpm lint
pnpm lint:fix
pnpm format
```

## 5. Deployment Workflow

### Standard Deployment

1. **Commit and push changes:**

   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin main
   ```

2. **Coolify auto-deploys** (if enabled) or manually trigger:
   - Go to Coolify dashboard
   - Select application (Web or API)
   - Click "Deploy" or "Redeploy"

### Manual Build (Testing)

```bash
# Test web build locally
docker build -f apps/web/Dockerfile -t logo-web .
docker run -p 3000:80 logo-web

# Test API build locally
docker build -f apps/api/Dockerfile -t logo-api .
docker run -p 3001:3000 -e DATABASE_URL=... logo-api
```

## 6. Monitoring and Debugging

### Check Application Status

```bash
# Coolify dashboard shows:
# - Build logs
# - Runtime logs
# - Resource usage
# - Health check status
```

### View Logs

In Coolify UI:

1. Select application
2. Go to "Logs" tab
3. View real-time logs

Or via SSH:

```bash
# View container logs
docker logs -f <container-name>

# View cloudflared logs
sudo journalctl -u cloudflared -f
```

### Health Checks

```bash
# Check web app
curl http://localhost:3000/health

# Check API
curl http://localhost:3001/health

# From internet (via cloudflared)
curl https://fcc-business.inherent.design/health
curl https://fcc-business-api.inherent.design/health
```

### Common Issues

**Issue: Build fails with "pnpm: command not found"**

- Ensure Dockerfile has `RUN corepack enable pnpm`

**Issue: Cannot access localhost from cloudflared**

- Verify cloudflared is system service, not Docker container
- Check `/etc/cloudflared/config.yml` has correct ports

**Issue: CORS errors in browser**

- Verify API's `CORS_ORIGIN` matches web domain
- Check browser console for specific CORS error

**Issue: Database connection fails**

- Verify `DATABASE_URL` is correct
- Check Postgres is running and accessible
- Ensure network connectivity

## 7. Environment Variables Reference

### Web App (.env)

| Variable       | Local Dev               | Production                                 |
| -------------- | ----------------------- | ------------------------------------------ |
| `VITE_API_URL` | `http://localhost:3001` | `https://fcc-business-api.inherent.design` |
| `NODE_ENV`     | `development`           | `production`                               |

### API App (.env)

| Variable       | Local Dev                                              | Docker Compose                                  | Production                             |
| -------------- | ------------------------------------------------------ | ----------------------------------------------- | -------------------------------------- |
| `PORT`         | `3001`                                                 | `3001`                                          | `3000` (internal)                      |
| `HOST`         | `0.0.0.0`                                              | `0.0.0.0`                                       | `0.0.0.0`                              |
| `NODE_ENV`     | `development`                                          | `development`                                   | `production`                           |
| `CORS_ORIGIN`  | `http://localhost:5173`                                | `http://localhost:3000`                         | `https://fcc-business.inherent.design` |
| `DATABASE_URL` | `postgresql://logouser:logopass@localhost:5432/logodb` | `postgresql://logouser:logopass@db:5432/logodb` | Your managed DB URL                    |

## 8. Security Considerations

- [ ] Use strong database passwords
- [ ] Keep cloudflared credentials secure (`/root/.cloudflared/`)
- [ ] Rotate JWT secrets regularly (when implemented)
- [ ] Enable Cloudflare WAF rules
- [ ] Set up SSL/TLS (automatic with Cloudflare Tunnel)
- [ ] Use non-root users in Docker containers (already configured)
- [ ] Regularly update dependencies and base images

## 9. Backup and Recovery

### Database Backups

```bash
# Create backup
docker exec <postgres-container> pg_dump -U logouser logodb > backup-$(date +%Y%m%d).sql

# Restore backup
docker exec -i <postgres-container> psql -U logouser logodb < backup-20241205.sql
```

### Configuration Backups

```bash
# Backup cloudflared config
sudo cp /etc/cloudflared/config.yml ~/backups/cloudflared-config-$(date +%Y%m%d).yml

# Backup Coolify (handled by Coolify itself)
```

## 10. Scaling Considerations

- **Horizontal Scaling:** Deploy multiple API instances with load balancer
- **Database:** Consider read replicas for high traffic
- **Caching:** Implement Redis for session/data caching
- **CDN:** Use Cloudflare CDN for static assets (automatic)
- **Monitoring:** Add APM tool (DataDog, New Relic, etc.)

## Support

For issues:

1. Check Coolify build/runtime logs
2. Check cloudflared logs: `sudo journalctl -u cloudflared`
3. Verify environment variables are set correctly
4. Test endpoints with curl
5. Review this documentation

---

**Last Updated:** 2024-12-05
**Maintainer:** Development Team
