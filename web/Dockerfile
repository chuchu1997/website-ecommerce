# Stage 1: Build
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


# ENV SKIP_BUILD_STATIC_GENERATION=true

RUN npm run build

# Stage 2: Run
FROM node:22-slim 

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3900
ENV NODE_ENV=production
# ENV SKIP_BUILD_STATIC_GENERATION=false
ENV PORT=3900

CMD ["npm", "start"]