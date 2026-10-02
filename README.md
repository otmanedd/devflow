# DevFlow

A full-stack project management platform built with Java, Spring Boot, React, TypeScript and PostgreSQL.

DevFlow provides a simple workspace-based environment for managing projects and issues through a Kanban board.

## Features

- JWT-based authentication
- User registration and login
- Workspace management
- Project management
- Issue creation, editing and deletion
- Issue priorities
- Kanban workflow
- Issue search and filtering
- PostgreSQL persistence
- REST API
- Docker Compose setup
- Automated backend tests with GitHub Actions

## Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA / Hibernate
- PostgreSQL
- Maven

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

### DevOps

- Docker
- Docker Compose
- GitHub Actions
- Git

## Architecture

```text
DevFlow
├── frontend
│   ├── React
│   ├── TypeScript
│   └── Tailwind CSS
│
└── backend
    ├── Spring Boot
    ├── REST API
    ├── Spring Security
    ├── JWT Authentication
    └── PostgreSQL

User
  ↓
React Frontend
  ↓
REST API
  ↓
Spring Boot
  ↓
Spring Data JPA
  ↓
PostgreSQL


./mvnw spring-boot:run
http://localhost:8080

cd frontend
npm install
npm run dev

http://localhost:5173

docker compose up --build

devflow/
├── src/
│   └── main/java/com/devflow/devflow/
│       ├── auth/
│       ├── config/
│       ├── issue/
│       ├── label/
│       ├── project/
│       ├── user/
│       └── workspace/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   └── App.tsx
│   └── package.json
│
├── Dockerfile
├── docker-compose.yml
├── pom.xml
└── .github/workflows/backend.yml

./mvnw test
The project also includes a GitHub Actions workflow that automatically runs the backend tests on pushes and pull requests.

Status

DevFlow is an MVP project focused on demonstrating full-stack software engineering skills, including backend development, frontend development, authentication, database integration, testing and containerization.

Author

Otmane Dyaf

Computer Science student at Technische Hochschule Mittelhessen (THM).


