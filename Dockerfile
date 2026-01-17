# Build Stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package files first to leverage cache
COPY app/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source
COPY app/src ./src

# Runner Stage
FROM node:18-alpine

# Set non-root user for security
WORKDIR /usr/src/app

# Copy artifacts from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/src ./src

# Use non-root user
USER node

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Start command
CMD ["npm", "start"]
