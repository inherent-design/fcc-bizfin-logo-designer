# Multi-stage build for Vite React app
FROM node:20-alpine AS builder

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

# Build the app
WORKDIR /app/apps/web
RUN pnpm build

# Production stage - serve with nginx
FROM nginx:alpine

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
