const jwt = require('jsonwebtoken')
const SECRET_KEY = "1234"

exports.userLoginAuth = (req,res,next) =>{
    const userId = req.params.id;
    let token = req.headers?.authorization
    console.log("token",token)
    try{
        if(token){
            // token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY)
            userId = user.id;
        }else{
            return res.render('login',{
                message : "Unauthorized User"
            })
        }
    }catch(error){
        console.log(error)
        return res.render('login',{
            message : "Unauthorized User"
        })
    }
}