#!/bin/bash

# Load environment variables from .env file
source .env

QUERY=$1

if [ -z "$QUERY" ]; then
  echo "Please provide the query file name, e.g. ./run_query.sh query1.sql"
  exit 1
fi

docker exec -i postgres_chistes psql -U admin -d chistesdb < ./initdb/queries/$QUERY