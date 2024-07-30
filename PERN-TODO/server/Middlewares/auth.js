const {getUser} = require("../service/auth");
async function restrictToLoggedinUserOnly(req,res,next){
    console.log(req.headers["authorization"]);
    const userUid = req.headers["authorization"];
 
    

    if(!userUid) {
        return res.redirect("https://metrotodo-1.onrender.com/");
    }
    const token = userUid.split('Bearer ')[1];
    const user = getUser(token);
    if(!user) return res.redirect("https://metrotodo-1.onrender.com/");
    req.user = user;
    next();

}

async function checkAuth(req,res,next){
    
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();

}


module.exports = {restrictToLoggedinUserOnly,checkAuth};