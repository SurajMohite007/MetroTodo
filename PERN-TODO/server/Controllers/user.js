const pool = require("../db");
const {v4: uuidv4} = require('uuid');
const {setUser,getUser} = require('../service/auth');
async function handleUserSignUp(req,res){
    try {
        
        const {name,email,password} = req.body;
        const newUser = await pool.query("INSERT INTO login(name,email,password) VALUES($1,$2,$3) RETURNING *",[name,email,password]);
        res.json(newUser.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }

}

async function handleUserLogin(req,res){
    try {
        
        const {email,password} = req.body;
        const User = await pool.query("SELECT * from login WHERE email = $1 and password = $2",[email,password]);
        if(User.rowCount>0){
            
            const token = setUser(User.rows[0]);
            
            // res.cookie("uid",token ,{
            //     httpOnly: true,
            //     sameSite: 'None', 
            //     domain: 'localhost', 
            //     path: '/', 
            //     secure: false,
                
            // }).json({ result: "Success" });
            return res.json({result:"Success",token});
        }
        else{
            return res.json({result:"Failure"});
        }
        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }

}


module.exports = {handleUserSignUp,handleUserLogin};