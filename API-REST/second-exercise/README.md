# Second Exercise: SQL Jokes Database

This project sets up a simple jokes database using PostgreSQL, with users, themes, and jokes. It uses Docker Compose for easy setup and includes SQL scripts to initialize and populate the database.


## Features

- Predefined tables for users, themes, and jokes.
- Example SQL scripts to create, populate, and query the database.
- Easy setup of a PostgreSQL database using Docker Compose.
- Simple script to run queries from the command line.

## Requirements

- [Docker](https://www.docker.com/get-started) installed on your system
- Bash shell (for running `run-query.sh` on Windows, use Git Bash or WSL)

## Project Structure

```
second-exercise/
├── docker-compose.yaml         # Docker Compose file to run PostgreSQL
├── initdb/
│   ├── 01_create_tables.sql    # SQL script to create tables
│   ├── 02_populate_tables.sql  # SQL script to populate tables with data
│   └── queries/
│       ├── query1.sql          # Example query 1
│       ├── query2.sql          # Example query 2
│       └── query3.sql          # Example query 3
└── run-query.sh                # Bash script to run queries against the database
```


## Setup

1. **Start the PostgreSQL database using Docker Compose:**
   ```sh
   docker-compose up -d
   ```
   This will start a PostgreSQL container and initialize the database using the scripts in `initdb/`.

2. **Wait a few seconds** for the database to initialize (usually 5-10 seconds).

## Environment Setup

`.env` file is required for this exercise. Just create a file in `second-exercise` folder with the following content:
``` bash
POSTGRES_USER=WHATEVER_USERNAME_GOES_HERE
POSTGRES_PASSWORD=YOUR_PASSWORD_GOES_HERE
POSTGRES_DB=WHATEVER_DB_NAME_GOES_HERE
```

## Running SQL Queries

You can run the example queries provided in the `initdb/queries/` directory using the `run-query.sh` script.

### Usage

```sh
./run-query.sh <query-file.sql>
```

**Example:**

```sh
./run-query.sh query1.sql
```

This will execute the SQL file against the running PostgreSQL container and print the results.

## Stopping and Cleaning Up

To stop the database and remove the container:

```sh
docker-compose down
```

## Customization

- To add more users, themes, or jokes, edit the SQL files in `initdb/` and restart the container.
- To add more queries, place new `.sql` files in `initdb/queries/` and run them with the script.
