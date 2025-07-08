# LLM Project

> **Conversational Assistant for Community Meeting Minutes (Actas)**

This project provides an API to query and extract information from community meeting minutes (actas) using Azure Cognitive Search and a Large Language Model (LLM). Users can ask natural language questions about the content of uploaded PDFs, and receive relevant, context-aware answers.

---

## Features

- **PDF Ingestion:** Upload and index meeting minutes (actas) in PDF format.
- **Semantic Search:** Retrieve relevant document fragments using Azure Cognitive Search with semantic capabilities.
- **LLM-Powered Q&A:** Ask natural language questions and get answers based on the actas' content.
- **REST API:** Simple endpoints for querying and managing documents.
- **Logging Middleware:** Request logging for debugging and monitoring.

---

## Requirements
- Node.js (v18+ recommended)
- npm
- **Azure Subscription** (for Cognitive Search, Document Intelligence and OpenAI LLM services)

## Project Structure
```
LLM/
|── scripts                     # Different useful scripts
├── src/
│   ├── data/                   # Folder containing PDF files to be ingested
│   ├── middleware/             # Just contains a logger
│   ├── routes/
│   │   └── consulta.route.ts   # Main API route
│   │   └── ...
│   ├── services/
│   │   └── llm.service.ts      # LLM API request. Also includes prompt design
│   │   └── pdf.service.ts      # For PDF text extraction
│   │   └── prompt.service.ts   # Prompt builder to include relevant fragments
│   │   └── search.service.ts   # For retreiving relevant information from the PDF related to the query
│   └── app.ts                  # Main Express app
```


## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**

   Create a `.env` file in the root of `LLM/` with the following:
   ```
    DOC_INTELLIGENCE_ENDPOINT
    DOC_INTELLIGENCE_API_KEY

    AZURE_SEARCH_ENDPOINT
    AZURE_SEARCH_API_KEY

    AZURE_OPENAI_ENDPOINT
    AZURE_OPENAI_API_KEY
    AZURE_OPENAI_DEPLOYMENT_NAME
    AZURE_OPENAI_API_VERSION
   ```
   > **How to get the required Azure keys:**
   > You can obtein the keys by running the `script/create-bot.sh` and then look into the Azure Portal for the endpoints and API keys.

3. **Run the server:**
   ```bash
   npm start
   ```
   The server will run at [http://localhost:3000](http://localhost:3000).


### API Usage

#### Get Answer

- **Endpoint:** `POST /consulta`
- **Body params:**
```json
    {
        "pregunta": "<YOUR QUESTION GOES HERE>"
    }
```

**Example:**
```
GET http://localhost:3000/api/v1/consulta in Postman

or 

curl -X POST http://localhost:3000/api/v1/consulta \
  -H "Content-Type: application/json" \
  -d '{"pregunta": "<YOUR QUESTION GOES HERE>"}'
```

**Response:**
```json
[
  {
    "respuesta": "Generated LLM goes here"
  },
]
```
