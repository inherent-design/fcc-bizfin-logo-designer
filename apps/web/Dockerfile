# Multi-stage build for Vite React app
FROM node:20-alpine AS builder

# Build arguments for version tracking
ARG GIT_SHA=unknown
ARG BUILD_DATE
ARG VERSION

# Enable pnpm
RUN corepack enable pnpm

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy web app package.json
COPY apps/web/package.json ./apps/web/

# Install dependencies (workspace aware)
RUN pnpm install --frozen-lockfile --filter @fcc-bizfin-logo-designer/web...

# Copy web app source
COPY apps/web ./apps/web

# Build the app with version injection
WORKDIR /app/apps/web

# Set VERSION as environment variable for Vite build
# This makes import.meta.env.VITE_APP_VERSION available at runtime
ENV VITE_APP_VERSION=${VERSION}

RUN pnpm build

# Production stage - serve with nginx
FROM nginx:alpine

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

# Copy built assets
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy nginx config
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (Coolify will remap)
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
