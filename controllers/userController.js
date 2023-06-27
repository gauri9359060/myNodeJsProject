const db = require('../database/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { validateDataRegister } = require('../middlewares/registerValidation')
const { validateDataLogin } = require('../middlewares/loginValidations')
const SECRET_KEY = "1234"

exports.register = (req,res) => {

  validateDataRegister(req,res, ()=>{
        const {name, email, password} = req.body;
        const userId = req.params.id;

        const registerUser = "INSERT INTO users (name, email, password) VALUES (?,?,?)"
        
        //To check if email/user already exist
        const emailCheckQuery = "SELECT email FROM users WHERE email=?";
        db.query(emailCheckQuery, [email], async(error,results)=>{
            try{
                  if(results.length > 0){
                      return res.render('register',{
                          message : "email already exist"
                      })
                  }
    
                  const salt = await bcrypt.genSalt(10)
                  //hashing password
                  let hashedPassword = await bcrypt.hash(password , salt)
                  // console.log(hashedPassword)
    
                  db.query(registerUser ,[name,email,hashedPassword], async(error,results)=>{
                      try{
                          // console.log(results)
                          // console.log("user created")

                          //Create jwt token
                          const token =jwt.sign({email , userId}, SECRET_KEY)
                          console.log(token)


                          // res.status(201).json({ message: 'User created successfully', token:token });
                          return res.render('register',{
                              message : "User Registered Successfully"
                          })
                      }catch(error){
                          console.log(error)
                          return;
                      }
                  });

                }catch(error){
                console.log(error)
                return;
            }
        });  
    })    

}


exports.login = (req, res) => {
    validateDataLogin(req,res, ()=>{
      const { email, password } = req.body;
      const existingUser = 'SELECT * FROM users WHERE email=?';
      db.query(existingUser, email, (error, results) => {
        try {
          if (results && results.length > 0) {
            // console.log(password)
            // console.log(results[0].password)

            const hashedPassword = results[0].password

            bcrypt.compare(password, hashedPassword, (error,response)=>{
              if(response){
                return res.redirect("/")
              }else{
                return res.render('login', {
                  message: 'Invalid Credentials',
                });
              }
            })
            

          } else {
            res.render('login', {
              message: 'User Does Not Exist',
            });
          }
        } catch (error) {
          console.log(error);
          return;
        }
      });
    })
};



