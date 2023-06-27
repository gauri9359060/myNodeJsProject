exports.validateDataLogin = (req,res,next) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.render('login',{
            message : "Please Fill All Feilds"
        })
    }

    
    next();
}