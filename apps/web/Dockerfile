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
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json apps/web/panda.config.ts apps/web/postcss.config.cjs ./apps/web/
COPY apps/web/tokens ./apps/web/tokens

# Install all dependencies (including dev, needed for build)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ============================================================================
# Build the application
# ============================================================================
FROM install AS build

ARG GIT_SHA=unknown
ARG BUILD_DATE
ARG VERSION
ARG BUILD_MODE=production

WORKDIR /app

# Copy web app source
COPY apps/web ./apps/web

# Build the app with version injection
WORKDIR /app/apps/web

# Set VERSION as environment variable for Vite build
ENV VITE_APP_VERSION=${VERSION}

# Run Vite build with explicit mode flag (development or production)
RUN pnpm exec vite build --mode ${BUILD_MODE}

# ============================================================================
# Deploy (creates deployment directory with built assets)
# ============================================================================
FROM build AS deploy

WORKDIR /app

# Deploy web app (copies dist/ folder per "files" field)
RUN pnpm deploy --filter=@fcc-bizfin-logo-designer/web --prod /prod/web

# ============================================================================
# Production runtime with nginx
# ============================================================================
FROM nginx:alpine AS production

# Re-declare build args for labels
ARG GIT_SHA=unknown
ARG BUILD_DATE
ARG VERSION

# Labels for version tracking
LABEL org.opencontainers.image.title="FCC Business Finance Logo Designer - Web"
LABEL org.opencontainers.image.description="React SPA for designing FCC Business & Finance Club logo"
LABEL org.opencontainers.image.source="https://github.com/inherent-design/fcc-bizfin-logo-designer"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.revision="${GIT_SHA}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"

# Copy built static assets from deployed output
COPY --from=deploy /prod/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
