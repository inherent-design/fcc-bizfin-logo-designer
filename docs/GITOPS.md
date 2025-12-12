# GitOps & Container Builds

## Dockerfile Architecture

### Multi-Stage Build Pattern

Each app uses identical [multi-stage build](https://docs.docker.com/build/building/multi-stage/) structure (each `FROM` creates a new stage, only the final stage becomes the image):

```
base → fetch → install → build → deploy → production
```

**base:** Node 22 + pnpm via corepack

**fetch:** Downloads packages using only `pnpm-lock.yaml` (maximizes [Docker layer caching](https://docs.docker.com/build/cache/))

**install:** Copies workspace config + installs all deps (build needs devDependencies)

**build:** Compiles TypeScript (API) or runs Vite (web)

**deploy:** Isolates app + production deps using `pnpm deploy --prod`

**production:** Minimal runtime image (Node for API, nginx for web)

### Build Arguments

```dockerfile
ARG GIT_SHA=unknown
ARG BUILD_DATE
ARG VERSION
ARG NODE_ENV=production
```

**GIT_SHA:** Commit hash for traceability

**BUILD_DATE:** ISO timestamp of commit

**VERSION:** Semantic version from package.json

**NODE_ENV:** Controls Vite optimizations + API logger verbosity

All embedded in [OCI image labels](https://github.com/opencontainers/image-spec/blob/main/annotations.md) (metadata attached to container images) + runtime environment.

---

## Image Tagging

### Development Builds

**Trigger:** Push to `dev` branch

**Tags:**

- `dev-{sha}` (specific commit)
- `dev-latest` (rolling)

**NODE_ENV:** `development`

### Production Builds

**Trigger:** Changesets release (merge "Version Packages" PR)

**Tags:**

- `{version}` (e.g., `0.1.6`)
- `latest` (rolling)

**NODE_ENV:** `production`

---

## Workflow Structure

### build-{api,web}.yml

**Dual-mode workflow:**

**Mode 1:** Branch push (traditional CI)

```yaml
on:
  push:
    branches: [dev]
    paths: ['apps/api/**', ...]
```

**Mode 2:** Reusable workflow (called by release.yml)

```yaml
on:
  workflow_call:
    inputs:
      version: string
      node_env: string
      is_production: boolean
```

**Version extraction logic:**

1. If `inputs.version` exists → use it (workflow_call)
2. Else if `dev` branch → `dev-{sha}`
3. Else → read from package.json

**Tagging logic:**

```yaml
tags: |
  type=raw,value=dev-{{sha}},enable=${{ github.ref == 'refs/heads/dev' }}
  type=raw,value=dev-latest,enable=${{ github.ref == 'refs/heads/dev' }}
  type=raw,value=${{ version }},enable=${{ inputs.is_production }}
  type=raw,value=latest,enable=${{ inputs.is_production }}
```

Only one mode active per run.

**Build process:**

1. [Matrix builds](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) for `linux/amd64` + `linux/arm64`
2. Each platform pushes digest (content-addressable hash of image layers) to registry
3. Upload digest as artifact
4. Merge job downloads all digests
5. Create [multi-arch manifest](https://docs.docker.com/build/building/multi-platform/) (index pointing to platform-specific images)

Result: Single image tag works on both architectures. Docker automatically selects correct platform.

### release.yml

**Trigger:** Push to `main` branch

**Flow:**

1. **release job:** Runs changesets action
   - If changesets exist → creates PR
   - If no changesets → tags releases via `pnpm changeset tag`
   - Outputs `publishedPackages` JSON

2. **Extract versions:** Parse `publishedPackages` using jq
   - Find each package by name
   - Extract `.version` field
   - Output as job output variables

3. **build-{api,web} jobs:** Call reusable workflows
   - Only run if `published == 'true'` and version exists
   - Pass version, `node_env='production'`, `is_production=true`

**Why reusable workflows:**

Tags created by workflows using `secrets.GITHUB_TOKEN` [don't trigger other workflows](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication#using-the-github_token-in-a-workflow) (GitHub prevents recursion). Solution: Call build workflows directly from release workflow using [`workflow_call`](https://docs.github.com/en/actions/using-workflows/reusing-workflows).

---

## Changesets Integration

**Purpose:** Automate [semantic versioning](https://semver.org/) + changelog generation using [Changesets](https://github.com/changesets/changesets)

**Developer workflow:**

1. Make changes
2. Run `pnpm changeset`
3. Commit changeset markdown file
4. Push to main

**Release workflow:**

1. Bot detects accumulated changesets
2. Opens PR bumping versions + updating CHANGELOGs
3. Merge PR → releases happen automatically
4. Git tags created (e.g., `@fcc-bizfin-logo-designer/api@0.0.7`)
5. Build workflows called with extracted versions

**Tag format:** `@{scope}/{package}@{version}`

Not used for Docker image tags (version extracted for that).

---

## Image Registry

**Target:** GitHub Container Registry (ghcr.io)

**Path:** `ghcr.io/{owner}/{image-name}`

**Authentication:** `secrets.GITHUB_TOKEN` (auto-provided)

**Permissions required:** `packages: write`

**Image names:** One per app

- `{repo-name}-api`
- `{repo-name}-web`

Separate repos = independent versioning + clearer artifact boundaries.

---

## Build Artifacts

**OCI labels embedded in each image:**

```
org.opencontainers.image.title
org.opencontainers.image.description
org.opencontainers.image.source
org.opencontainers.image.version
org.opencontainers.image.revision (GIT_SHA)
org.opencontainers.image.created
```

Query via:

```bash
docker inspect {image} | jq '.[0].Config.Labels'
```

**Runtime environment variables:**

API:

- `APP_VERSION` (from VERSION build arg)
- `NODE_ENV`
- `PORT=3001`

Web:

- `VITE_APP_VERSION` (build-time only, baked into bundle)

---

## Adding a New App

**1. Create Dockerfile:**

Copy existing Dockerfile, adjust:

- Package name in `pnpm deploy --filter`
- Source paths in COPY statements
- Exposed port
- Health check command
- Image labels

**2. Create workflow:**

Copy `build-web.yml` → `build-{name}.yml`, adjust:

- `IMAGE_NAME` env var
- Dockerfile path in `file:` parameter
- Package name in version extraction fallback

**3. Wire to release:**

In `release.yml`:

- Add version extraction for new package
- Add job output
- Add build job calling new workflow

**4. Test:**

```bash
# Dev build
git checkout -b test-new-app
# ... make changes ...
git push origin test-new-app
# Merge to dev → triggers build

# Prod build
pnpm changeset  # Select new package
# Merge to main → creates release PR → merge → builds
```

---

## Local Testing

**Build image:**

```bash
docker build \
  --build-arg VERSION=0.0.0-local \
  --build-arg GIT_SHA=$(git rev-parse HEAD) \
  --build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
  --build-arg NODE_ENV=development \
  -f apps/api/Dockerfile \
  -t test-api:local \
  .
```

**Run:**

```bash
docker run -p 3001:3001 test-api:local
```

**Inspect:**

```bash
docker inspect test-api:local | jq '.[0].Config.Labels'
```

---

## Conventions

**Image naming:** `{repo-name}-{app-name}` (hyphen-separated)

**Tag naming:**

- Development: `dev-{sha}`, `dev-latest`
- Production: `{semver}`, `latest`
- No `v` prefix (version display in UI adds it)

**Dockerfile location:** `apps/{name}/Dockerfile`

**Workflow location:** `.github/workflows/build-{name}.yml`

**Build context:** Repository root (.)

**Multi-arch:** Always build amd64 + arm64

**Cache strategy:** [Registry cache](https://docs.docker.com/build/cache/backends/registry/) per platform (`buildcache-{platform}`) for faster rebuilds

**Security:** Non-root user (API), distroless consideration (future)

---

## Deployment-Agnostic Design

These images work with:

- Docker Compose
- Kubernetes
- Nomad
- ECS/Fargate
- Cloud Run
- Plain Docker

Container exposes port, runs process, provides health check. Orchestration layer decides networking, scaling, secrets injection.

Configuration via environment variables following [12-factor app](https://12factor.net/) principles (externalized config, stateless processes).
