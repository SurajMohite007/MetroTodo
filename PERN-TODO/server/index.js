const express = require("express")
const cors = require("cors")
const app = express();
const pool = require("./db")
const todosRouter = require("./routes/todos")

//Middlewares 
app.use(express.json());
app.use(cors());

app.use("/todos",todosRouter);


//  APIs for Login/SignUp purposes

app.post("/signup", async (req,res)=>{
    try {
        
        const {name,email,password} = req.body;
        const newUser = await pool.query("INSERT INTO login(name,email,password) VALUES($1,$2,$3) RETURNING *",[name,email,password]);
        res.json(newUser.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }

})

app.post("/login", async (req,res)=>{
    try {
        
        const {email,password} = req.body;
        const User = await pool.query("SELECT * from login WHERE email = $1 and password = $2",[email,password]);
        if(User.rowCount>0){
            return res.json("Success");
        }
        else{
            return res.json("Failure");
        }
        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }

})




app.listen(5000,()=>{
    console.log("The server has started on port 5000");
})