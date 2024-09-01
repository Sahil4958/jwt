const JWT = require("jsonwebtoken")
module.exports = async (req,res,next) =>{
   const token = req.header('x-auth-token')

   //CHECK IF WE EVEN HAVE A TOKEN
if(!token){
    return res.status(400).json({
        "errors": [
            {
                "msg" : "No token found",
            }
        ]
    })
}

try{
    let user = await JWT.verify(token, "nfnfjnejnr4ujnhrui4hji9i30949i31ndj")
      req.user = user.email;
      next()

}catch(error){
    return res.status(400).json({
        "errors": [
            {
                "msg" : "Token invalid",
            }
        ]
    })
}


}

