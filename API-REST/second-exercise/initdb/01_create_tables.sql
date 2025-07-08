CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    theme VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE jokes (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    id_username INT REFERENCES users(id),
    id_theme INT REFERENCES themes(id)
);