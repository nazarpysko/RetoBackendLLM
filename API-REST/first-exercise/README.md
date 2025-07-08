# First Exercise – Joke & Math API

This project is an Express.js REST API for managing jokes (Chuck Norris and Dad jokes) and performing simple math operations. It uses MongoDB for joke persistence and provides full Swagger documentation.

## Features

- Fetch random Chuck Norris or Dad jokes from public APIs.
- Store, update, and delete custom jokes in MongoDB.
- Math endpoints: Least Common Multiple (LCM) and increment.
- Fully documented with Swagger UI.

## Requirements

- Node.js (v18+ recommended)
- npm
- MongoDB (running locally at `mongodb://localhost:27017/jokesdb` by default)

## Project structure

```
first-exercise/
├── src/
│   ├── app.ts                  # Main Express app
│   ├── routes/                 # API route definitions
│   ├── services/               # Business logic for jokes and math
│   ├── models/                 # Mongoose models
│   ├── database/               # MongoDB connection
│   ├── docs/                   # Swagger documentation
│   └── __tests__/              # Test files

```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB:**
   You can run MongoDB locally or use Docker. To run a MongoDB container with Docker:
   ```bash
   docker run -d --name jokes-mongo -p 27017:27017 -v jokes-mongo-data:/data/db mongo:6.0
   ```
   - This will start a MongoDB instance accessible at `mongodb://localhost:27017/jokesdb`.
   - Data will persist in the `jokes-mongo-data` Docker volume.
   - To stop and remove the container:
     ```bash
     docker stop jokes-mongo && docker rm jokes-mongo
     ```

3. **Run the server:**
   ```bash
   npm start
   ```
   The server will run at [http://localhost:3000](http://localhost:3000).

## API Usage

### Jokes Endpoints

#### Get a random joke

- **GET `/api/v1/jokes`**
- Returns a random Chuck Norris or Dad joke.

**cURL:**
```bash
curl http://localhost:3000/api/v1/jokes
```

**Example Response:**
```json
{
  "jokeType": "chuck",
  "joke": "Chuck Norris can divide by zero."
}
```

#### Get a joke by type

- **GET `/api/v1/jokes/:type`** (`type` = `chuck` or `dad`)
- Returns a joke of the specified type.

**cURL:**
```bash
curl http://localhost:3000/api/v1/jokes/chuck
curl http://localhost:3000/api/v1/jokes/dad
```

**Example Response:**
```json
{
  "jokeType": "dad",
  "joke": "Why did the dad joke cross the road? To get to the pun side."
}
```

#### Add a new joke

- **POST `/api/v1/jokes`**
- Body: `{ "text": "Your joke here" }`

**cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/jokes \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a new joke."}'
```

**Example Response:**
```json
{
  "joke": "This is a new joke.",
  "id": "60a7b2b5c1234567890abcdef"
}
```

#### Update a joke

- **PUT `/api/v1/jokes/:number`**
- Body: `{ "text": "Updated joke" }`

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/v1/jokes/<jokeId> \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated joke text."}'
```

**Example Response:**
```json
{
  "joke": "Updated joke text.",
  "id": "60a7b2b5c1234567890abcdef"
}
```

#### Delete a joke

- **DELETE `/api/v1/jokes/:number`**

**cURL:**
```bash
curl -X DELETE http://localhost:3000/api/v1/jokes/<jokeId>
```

**Example Response:**
```json
{
  "joke": "This is a deleted joke.",
  "id": "60a7b2b5c1234567890abcdef"
}
```

---

### Math Endpoints

#### Least Common Multiple

- **GET `/api/v1/math/lcm?numbers=2,3,4`**
- Returns the least common multiple of the provided numbers.

**cURL:**
```bash
curl "http://localhost:3000/api/v1/math/lcm?numbers=2,3,4"
```

**Example Response:**
```json
{
  "lcm": 12
}
```

#### Increment a number

- **GET `/api/v1/math/increment?number=5`**
- Returns the incremented value.

**cURL:**
```bash
curl "http://localhost:3000/api/v1/math/increment?number=5"
```

**Example Response:**
```json
{
  "increment": 6
}
```
### Trying with Postman and Swagger
You can also try this server by doing the using standard calls with the needed parameters with Postman or just accessing Swagger available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) after doing the [setup steps](#setup).

---

### API Documentation

Swagger UI is available at:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

You can also import the API into Postman using the OpenAPI/Swagger definition found in `src/docs/swagger.yaml`.

## Testing

Run tests with:
```bash
npm test
```

## TODOs

See `TODO.md` for ideas and future improvements.