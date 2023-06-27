const express = require('express');
const { userLoginAuth } = require('../middlewares/userLoginAuth');
const router = express.Router();


//to show home page
router.get("/",(req,res)=>{
    res.render("index")
});

//to show register page 
router.get("/register", (req,res)=>{
    res.render("register")
});

//to show login page
router.get("/login",(req,res)=>{
    res.render("login")
})


module.exports = router;