const pool = require("../db");

async function handleGetAllTodos(req,res){
    try {
        const id = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5; 
        const offset = (page - 1) * limit;
        const comp = req.query.completed;

        let query = "SELECT * FROM todo WHERE user_id = $1";

        const queryParams = [id];

        if (comp !== 'all') {
          if (comp === 'completed') {
            query += " AND completed = true"; 
          } else if (comp === 'active') {
            query += " AND completed = false"; 
          }
        }

        query += " ORDER BY todo_id LIMIT $2 OFFSET $3";


        const allTodos = await pool.query(query,[...queryParams,limit,offset]);

        const totalCount = await pool.query(
            "SELECT COUNT(*) FROM todo WHERE user_id = $1",
            [id]
        );

        const totalPages = Math.ceil(totalCount.rows[0].count / limit);

        res.json({
            totalPages: totalPages,
            currentPage: page,
            todos: allTodos.rows
        });
        

        
        
    } catch (err) {
        console.error(err.message);
    }
}

async function handleSearchTodos(req, res) {
    try {
      const id = req.user.id;
      let searchTerm = req.query.searchTerm.toLowerCase();
  
      let searchQuery = `
        SELECT * 
        FROM todo 
        WHERE user_id = $1
      `;
  
      const queryParams = [id];
  
      
      if (searchTerm.trim() !== '') {
        searchQuery += `
          AND LOWER(description) LIKE '%' || $2 || '%'
        `;
        queryParams.push(searchTerm);
      }
  
      searchQuery += `
        ORDER BY todo_id;
      `;
  
      const searchResults = await pool.query(searchQuery, queryParams);
  
      res.json(searchResults.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
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

async function handleUpdateStatusById(req,res){

  try {
    const todoId = req.params.id;
    const { completed } = req.body;
    const updateQuery = `
      UPDATE todo
      SET completed = $1
      WHERE todo_id = $2
    `;
    await pool.query(updateQuery, [completed, todoId]);

    res.status(200).json({ message: 'Completion status updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
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
        const user_id = req.user.id;
        const newTodo = await pool.query("INSERT INTO todo(description,user_id) VALUES($1,$2) RETURNING *",[description,user_id]);
        res.json(newTodo.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {handleGetAllTodos,handleGetTodoById,handleUpdateTodoById,handleDeleteTodoById,handleCreateNewTodo,handleSearchTodos,handleUpdateStatusById};