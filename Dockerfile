# syntax=docker/dockerfile:1

# 1) deps: install ALL deps (need @nestjs/cli + typescript to build)
FROM node:24-alpine AS deps
# openssl: Prisma's schema engine (used by migrations) needs it on alpine
RUN apk add --no-cache openssl && npm install -g pnpm@12.6.0
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# 2) build: generate Prisma client into src/generated, compile TS -> dist, then drop devDependencies
FROM deps AS build
COPY . .
RUN pnpm prisma generate && pnpm run build && pnpm prune --prod

# 3) runtime: prod deps + compiled output. Also used by the `migrate` service (same image, different command).
FROM node:24-alpine AS runtime
RUN apk add --no-cache openssl
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY public ./public
# migrations + Prisma config, used by `prisma migrate deploy` in the migrate service
COPY prisma ./prisma
COPY prisma7.config.ts ./
USER node
EXPOSE 3000
# exec form: node is PID 1 and receives SIGTERM directly (graceful shutdown)
CMD ["node", "dist/main.js"]
