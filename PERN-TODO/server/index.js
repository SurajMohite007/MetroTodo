const express = require("express")
const cors = require("cors")
const app = express();
const pool = require("./db")

//Middlewares 
app.use(express.json());
app.use(cors());


app.post("/todos", async (req,res)=>{
    try {
        
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *",[description]);
        res.json(newTodo.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }

})

app.get("/todos", async (req,res)=>{
    try {
        const alltodos = await pool.query("SELECT * from todo");
        res.json(alltodos.rows);
        
    } catch (err) {
        console.error(err.message);
    }

})

app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

app.delete("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo where todo_id = $1",[id]);
        res.json("Todo was deleted!");
        
    } catch (err) {
        console.error(err.message);
    }

})

app.put("/todos/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updatedTodo = await pool.query("UPDATE todo SET description = $2 where todo_id = $1 RETURNING *",[id,description]);
        res.json("Todo was updated!");
        
    } catch (err) {
        console.error(err.message);
    }

})


app.listen(5000,()=>{
    console.log("The server has started on port 5000");
})