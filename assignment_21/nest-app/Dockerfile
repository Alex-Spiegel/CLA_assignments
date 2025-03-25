########################
# 1️⃣ Build-Stage
########################
FROM node:lts-alpine3.19 AS builder

WORKDIR /app

COPY package*.json ./
COPY .env .env

RUN npm install

COPY . .

RUN npm run build


########################
# 2️⃣ Production-Stage
########################
FROM node:lts-alpine3.19 AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
