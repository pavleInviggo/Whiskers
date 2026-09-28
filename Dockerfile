# syntax=docker/dockerfile:1

# 1) deps: install ALL deps (need @nestjs/cli + typescript to build)
FROM node:24-alpine AS deps
RUN npm install -g pnpm@12.6.0
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# 2) build: compile TS -> dist, then drop devDependencies
FROM deps AS build
COPY . .
RUN pnpm run build && pnpm prune --prod

# 3) runtime: small image, prod deps + compiled output only
FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY public ./public
USER node
EXPOSE 3000
# exec form: node is PID 1 and receives SIGTERM directly (graceful shutdown)
CMD ["node", "dist/main.js"]
