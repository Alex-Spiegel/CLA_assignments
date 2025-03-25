# Backend Deployment – Express & NestJS with Docker

This project demonstrates how to containerize two backend applications using Docker:

- `express-app/` – Express.js app connected to MongoDB
- `nest-app/` – NestJS app using a multi-stage build

---

## Project Structure

assignment_21/<br>
├── express-app/<br>
│ ├── Dockerfile<br>
│ └── ...<br>
├── nest-app/<br>
│ ├── Dockerfile<br>
│ └── ...<br>

---

## How to Run

### 1. Start MongoDB (in Docker)

```bash
docker run -d --name mongo -p 27017:27017 mongo
```


---

## 2. Build & Run Express App

```bash
cd express-app
docker build -t codecla-express:v1 .
docker run -d -p 5000:5000 --name express-app \
  -e MONGO_URI="mongodb://host.docker.internal:27017/express-test" \
  codecla-express:v1
  ```

---

## 3. Build & Run NestJS App

```bash
cd nest-app
docker build -t codecla-nestjs:v1 .
docker run -d -p 4000:4000 --name nest-app \
  -e MONGO_URI="mongodb://host.docker.internal:27017/nest-test" \
  codecla-nestjs:v1
```

---

## 4. Testing

Express API: http://localhost:5000

NestJS API: http://localhost:4000