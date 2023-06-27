exports.validateDataRegister = (req,res,next) =>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.render('register',{
            message : "Please Fill All Feilds"
        })
    }
    next();
}