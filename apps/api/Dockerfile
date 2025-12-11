# syntax=docker/dockerfile:1

# ============================================================================
# Base environment with pnpm
# ============================================================================
FROM node:22-slim AS base

RUN corepack enable
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# ============================================================================
# Fetch dependencies (cache-optimized)
# ============================================================================
FROM base AS fetch

WORKDIR /app

# Copy only lockfile for maximum cache efficiency
COPY pnpm-lock.yaml ./

# Fetch packages into pnpm store (BuildKit cache mount)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm fetch

# ============================================================================
# Install all dependencies
# ============================================================================
FROM base AS install

WORKDIR /app

# Copy workspace configuration
COPY pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/

# Install all dependencies (including dev, needed for build)
# Use offline mode to leverage fetched packages
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ============================================================================
# Build the application
# ============================================================================
FROM install AS build

ARG GIT_SHA=unknown
ARG BUILD_DATE
ARG VERSION

WORKDIR /app

# Copy API source code
COPY apps/api/src ./apps/api/src
COPY apps/api/tsconfig.json ./apps/api/

# Build TypeScript
WORKDIR /app/apps/api
RUN pnpm build

# ============================================================================
# Deploy with production dependencies only
# ============================================================================
FROM build AS deploy

WORKDIR /app

# Deploy API with production dependencies into isolated directory
RUN pnpm deploy --filter=@fcc-bizfin-logo-designer/api --prod /prod/api

# ============================================================================
# Production runtime
# ============================================================================
FROM node:22-slim AS production

# Re-declare build args for labels and runtime
ARG GIT_SHA=unknown
ARG BUILD_DATE
ARG VERSION

# Set VERSION as environment variable for runtime access
ENV APP_VERSION=${VERSION}
ENV NODE_ENV=production
ENV PORT=3001

# Labels for version tracking
LABEL org.opencontainers.image.title="FCC Business Finance Logo Designer - API"
LABEL org.opencontainers.image.description="Fastify API for FCC Business & Finance Club logo designer"
LABEL org.opencontainers.image.source="https://github.com/inherent-design/fcc-bizfin-logo-designer"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.revision="${GIT_SHA}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"

# Install dumb-init for proper signal handling
RUN apt-get update && \
    apt-get install -y --no-install-recommends dumb-init && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs -m -d /app nodejs

WORKDIR /app

# Copy deployed application (self-contained with dependencies)
COPY --from=deploy --chown=nodejs:nodejs /prod/api ./

# Switch to non-root user
USER nodejs

# Expose API port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/server.js"]
