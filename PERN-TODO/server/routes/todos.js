const express = require("express");
const pool = require("../db");
const router = express.Router();
const {handleGetAllTodos,handleGetTodoById,handleUpdateTodoById,handleDeleteTodoById,handleCreateNewTodo} = require("../Controllers/todos");
const validate = require("../Middlewares/Validation");
const todoSchema = require("../Middlewares/schemas/TodoSchema");


router.post("/", validate(todoSchema) ,handleCreateNewTodo);

router.get("/",handleGetAllTodos);

router.route("/:id").get(handleGetTodoById).delete(handleDeleteTodoById).put(handleUpdateTodoById);



module.exports = router;