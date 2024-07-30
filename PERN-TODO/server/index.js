const express = require("express")
const cors = require("cors")
const app = express();
const pool = require("./db")
const todosRouter = require("./routes/todos")
const userRouter = require("./routes/user")
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly} = require('./Middlewares/auth');
const path = require("path");
const PORT = process.env.PORT || 5000;

// const corsOptions = {
//     origin: "http://localhost:3000", 
//     credentials: true,
//   };

  const corsOptions = {
    origin: process.env.NODE_ENV === "production" ? "https://metrotodo.netlify.app" : "http://localhost:3000",
    credentials: true,
  };
//Middlewares 
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());




// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname,"client/build")));
// }




//Routes
app.use("/todos",restrictToLoggedinUserOnly,todosRouter);
app.use("/user",userRouter);






app.listen(PORT,()=>{
    console.log(`The server has started on port ${PORT}`);
})