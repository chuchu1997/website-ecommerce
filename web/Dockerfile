# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app

# Copy package và cài dependencies
COPY package*.json ./
RUN npm ci

# Copy toàn bộ code
COPY . .

# Build Next.js (không bật SKIP_BUILD_STATIC_GENERATION)
RUN npm run build

# Stage 2: Runtime
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3900

# Copy chỉ các thư mục cần thiết từ builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Quan trọng: tạo quyền ghi cho ISR cache
RUN mkdir -p .next/cache && chmod -R 777 .next/cache

EXPOSE 3900
CMD ["npm", "start"]
