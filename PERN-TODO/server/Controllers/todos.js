const pool = require("../db");

async function handleGetAllTodos(req,res){
    try {
        const alltodos = await pool.query("SELECT * from todo");
        res.json(alltodos.rows);
        
    } catch (err) {
        console.error(err.message);
    }
}

async function handleGetTodoById(req,res){
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
          id
        ]);
    
        res.json(todo.rows[0]);
      } catch (err) {
        console.error(err.message);
      }
}

async function handleUpdateTodoById(req,res){
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updatedTodo = await pool.query("UPDATE todo SET description = $2 where todo_id = $1 RETURNING *",[id,description]);
        res.json("Todo was updated!");
        
    } catch (err) {
        console.error(err.message);
    }
}

async function handleDeleteTodoById(req,res){
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo where todo_id = $1",[id]);
        res.json("Todo was deleted!");
        
    } catch (err) {
        console.error(err.message);
    }
}

async function handleCreateNewTodo(req,res){
    try {
        
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *",[description]);
        res.json(newTodo.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {handleGetAllTodos,handleGetTodoById,handleUpdateTodoById,handleDeleteTodoById,handleCreateNewTodo};