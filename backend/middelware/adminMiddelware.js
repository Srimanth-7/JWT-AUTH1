const adminMiddleware = (req,res,next)=>{
    console.log(req.user)
    if (req.user.role !== "admin"){
        return res.send("Asses Denied");
    }
    next(); 
}

module.exports = adminMiddleware;