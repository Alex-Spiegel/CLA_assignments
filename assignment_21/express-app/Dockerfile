# 1️⃣ Basis-Image
FROM node:lts-alpine3.19

# 2️⃣ Arbeitsverzeichnis im Container
WORKDIR /app

# 3️⃣ Nur package.json kopieren
COPY ./package*.json ./
RUN npm install

# 4️⃣ Restlichen Code kopieren
COPY . .

# 5️⃣ Port freigeben
EXPOSE 5000

# 6️⃣ Startbefehl
CMD ["npm", "start"]
