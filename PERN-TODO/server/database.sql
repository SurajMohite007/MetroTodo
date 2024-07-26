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



\c perntodo;


ALTER TABLE todo
ADD COLUMN user_id INT;


ALTER TABLE todo
ADD CONSTRAINT fk_todo_user_id
FOREIGN KEY (user_id) REFERENCES login(id);
