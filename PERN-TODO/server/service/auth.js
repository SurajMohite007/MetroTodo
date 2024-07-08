const jwt  = require("jsonwebtoken");
const secret = "Suraj$123@$";

function setUser(user){
    
    return jwt.sign({id:user.id, email: user.email},secret);
}

function getUser(token){

    if(!token) return null;

    try {
        return jwt.verify(token,secret);
    } catch (error) {

        return null;
        
    }
    
    
}

module.exports = {setUser,getUser};