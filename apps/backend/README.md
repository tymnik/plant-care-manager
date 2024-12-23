# 🌱 Plant Care Manager - Backend 🌳

## Description

This repository contains the backend for Plant Care Manager, an application that provides users with an encyclopedia of plants 🌿 and data on their care 💧☀️. It allows users to create personalized care guides for their plants 📝 and set reminders for watering and other care tasks 🔔.

## Technologies Used

- **NestJS:** A progressive Node.js framework for building efficient, reliable and scalable server-side applications. 🚀
- **Prisma:** Next-generation Node.js and TypeScript ORM. 🗃️
- **PostgreSQL:** A powerful, open-source object-relational database system. 🐘
- **Docker:** Platform for developing, shipping, and running applications in containers. 🐳
- **Minio:** High-performance object storage compatible with Amazon S3 APIs. 💾

## Getting Started

### Prerequisites

- **Node.js and npm:** Make sure you have Node.js and npm installed on your system.
- **PostgreSQL:** Install and run a PostgreSQL database.
- **Docker:** Install Docker on your system.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/plant-care-manager-backend.git
   cd plant-care-manager-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the Docker(recommended)**:

   ```
   cd docker
   docker-compose up -d --build
   ```

4. **Set up Minio**:

- Open the Minio Console in your web browser:

  ```
  http://localhost:9001
  ```

- Log in to the Minio Console using the default credentials (access key: minioadmin, secret key: minioadmin).

- Create a bucket with the name "Public" and set the policy to "public". 4. **Set up environment variables:**

5. ** Set up environment variables:**:
   Create a `.env` file in the root directory and add the following environment variables, replacing the placeholders with your actual values:

   ```
   DATABASE_URL="postgresql://your-db-user:your-db-password@your-db-host:5432/your-db-name?schema=public"
   JWT_ACCESS_SECRET="your-jwt-access-secret"
   JWT_REFRESH_SECRET="your-jwt-refresh-secret"

   S3_ENDPOINT="http://localhost:9000"
   S3_ACCESS_KEY=root
   S3_SECRET_KEY=password
   S3_BUCKET_NAME="public"
   AWS_REGION="any"

   NODE_ENV = "development"
   ```

6. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

7. **Seed the database (optional):**

   ```bash
   npm run seed -- -r <number-of-rounds>
   ```

8. **Start the development server:**

   ```bash
   npm run start:dev
   ```

## Contributing

## License
