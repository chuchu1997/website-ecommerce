# Stage 1: Build
FROM node:22-slim AS builder
WORKDIR /app

# Cài dependencies trước để cache tốt hơn
COPY package*.json ./
RUN npm ci

# Copy toàn bộ source
COPY . .

# Skip fetch API khi build để tránh lỗi ENOTFOUND
ENV SKIP_BUILD_STATIC_GENERATION=true

# Build Next.js
RUN npm run build

# Stage 2: Runtime
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3900
# Runtime thì KHÔNG skip API (để ISR hoạt động)
ENV SKIP_BUILD_STATIC_GENERATION=false

# Copy output từ builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Tạo quyền ghi cho cache ISR
RUN mkdir -p .next/cache && chmod -R 777 .next/cache

EXPOSE 3900
CMD ["npm", "start"]
