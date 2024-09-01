const router = require("express").Router();
const {privatePost , publicPost} = require("../db")
const checkAuth = require("../middleware/checkAuth")

router.get("/private",checkAuth,(req,res,next)=>{
    let userValid = true;

    if(userValid){
        next()
    }else{
        return res.status(400).json({
            "errors" : [
                {
                    "msg" : "Access Denied"
                }
            ]
        })
    }
},(req,res)=>{
    res.json(privatePost)
})

router.get("/public",(req,res)=>{
    res.json(publicPost)
})


module.exports = router;