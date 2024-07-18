const express = require("express");
const router = express.Router();
const {handleGetAllTodos,handleGetTodoById,handleUpdateTodoById,handleDeleteTodoById,handleCreateNewTodo,handleSearchTodos} = require("../Controllers/todos");
const validate = require("../Middlewares/Validation");
const todoSchema = require("../Middlewares/schemas/TodoSchema");


router.post("/", validate(todoSchema) ,handleCreateNewTodo);

router.get("/",handleGetAllTodos);

router.get("/search",handleSearchTodos);

router.route("/:id").get(handleGetTodoById).delete(handleDeleteTodoById).put(handleUpdateTodoById);



module.exports = router;