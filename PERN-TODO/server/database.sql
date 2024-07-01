CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)

);

CREATE TABLE login(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255),
    password VARCHAR(100)
);