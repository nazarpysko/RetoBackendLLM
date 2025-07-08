# RetoBackendLLM

> **Monorepo for Backend and LLM Exercises**

This repository contains solutions and code for a series of backend and AI exercises, including REST APIs, database operations, and a Large Language Model (LLM) powered assistant for querying community meeting minutes.

---

## Project Structure

```
RetoBackendLLM/
│
├── API-REST/
│   ├── first-exercise/      # Node.js REST API with MongoDB and basic endpoints
│   ├── second-exercise/     # SQL exercises and Docker Compose for database setup
│   └── third-exercise/      # Node.js REST API with advanced features and tests
│
├── LLM/                    # Conversational assistant for querying PDFs using Azure Cognitive Search and LLM
│
└── README.md                # This file
```

---

## Subprojects

### 1. API-REST
- **first-exercise:**
  - REST API with endpoints for jokes and math operations, using MongoDB.
  - Includes tests and Swagger documentation.
  - [See README](API-REST/first-exercise/README.md)
- **second-exercise:**
  - SQL queries and database setup using Docker Compose.
  - [See README](API-REST/second-exercise/README.md)
- **third-exercise:**
  - REST API with improved structure, middleware, and tests.
  - [See README](API-REST/third-exercise/README.md)

### 2. LLM
- Conversational API for querying community meeting minutes (actas) in PDF format.
- Uses Azure Cognitive Search (with semantic search) and OpenAI LLM for natural language Q&A.
- [See README](LLM/README.md)

---

## Getting Started

Each subproject is self-contained. Please refer to the README in each directory for detailed setup and usage instructions.

### Example: Running the LLM Project
```bash
cd LLM
npm install
npm start
```

---

## Requirements
- Node.js (v18+ recommended)
- npm
- Docker (for second-exercise)
- Azure Subscription (for LLM project)

---

## License

MIT License 