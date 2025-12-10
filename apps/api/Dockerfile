# Multi-stage build for Node.js API
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

# Copy API package.json
COPY apps/api/package.json apps/api/tsconfig.json ./apps/api/

# Install dependencies (workspace aware, production only)
RUN pnpm install --frozen-lockfile --filter @fcc-bizfin-logo-designer/api... --prod --ignore-scripts

# Copy API source
COPY apps/api/src ./apps/api/src

# Build TypeScript
WORKDIR /app/apps/api
RUN pnpm build

# Production stage
FROM node:20-alpine

# Labels for version tracking
LABEL org.opencontainers.image.title="FCC Business Finance Logo Designer - API"
LABEL org.opencontainers.image.description="Fastify API for FCC Business & Finance Club logo designer"
LABEL org.opencontainers.image.source="https://github.com/inherent-design/fcc-bizfin-logo-designer"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.revision="${GIT_SHA}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy only production files
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Expose API port (Coolify will remap)
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3001/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/server.js"]
