# Use a Node.js base image
FROM node:20-slim AS builder

# Set the working directory
WORKDIR /app

# Install pnpm (assuming pnpm since pnpm-lock.yaml is in the directory)
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Nuxt application
RUN pnpm build

# Final stage: Runner
FROM node:20-slim AS runner

WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/.output /app/.output

# Expose the default Nuxt port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Run the application
CMD ["node", ".output/server/index.mjs"]
