const express = require("express")
const cors = require("cors")
const app = express();
const pool = require("./db")
const todosRouter = require("./routes/todos")
const userRouter = require("./routes/user")
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly} = require('./Middlewares/auth');

const corsOptions = {
    origin: "http://localhost:3000", // to allow requests from client
    credentials: true,
  };
//Middlewares 
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Routes
app.use("/todos",restrictToLoggedinUserOnly,todosRouter);
app.use("/user",userRouter);


//  APIs for Login/SignUp purposes

// app.post("/signup", async (req,res)=>{
//     try {
        
//         const {name,email,password} = req.body;
//         const newUser = await pool.query("INSERT INTO login(name,email,password) VALUES($1,$2,$3) RETURNING *",[name,email,password]);
//         res.json(newUser.rows[0]);
        
//     } catch (err) {
//         console.error(err.message);
//     }

// })

// app.post("/login", async (req,res)=>{
//     try {
        
//         const {email,password} = req.body;
//         const User = await pool.query("SELECT * from login WHERE email = $1 and password = $2",[email,password]);
//         if(User.rowCount>0){
//             return res.json("Success");
//         }
//         else{
//             return res.json("Failure");
//         }
        
        
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json("Server Error");
//     }

// })




app.listen(5000,()=>{
    console.log("The server has started on port 5000");
})