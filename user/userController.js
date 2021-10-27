const express = require('express')
const router = express.Router()
const User = require("./user")
const Category = require("../categories/Category")
var bcrypt = require('bcrypt')
const adminAuth = require('../middlewares/adminAuth')

router.get("/admin/users",adminAuth,(req,res) =>{
    res.send("Listagem de usuários")
})

router.get("/admin/users/create",(req,res)=>{
    Category.findAll().then(category => {
        res.render("admin/users/create",{categories: category})
    })
    if(req.session.users){
        res.redirect('/admin/articles/articles');
    }
})

router.get("/admin/users/login",(req,res)=>{
    Category.findAll().then(category => {
        res.render("admin/users/login",{categories: category})
    })
})

router.post("/admin/user/create",(req,res)=>{
    var email = req.body.email
    var password = req.body.password
  

    User.findOne({
        where:{email:email}
    }).then(user =>{
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password,salt)
            if(email!== undefined){
                User.create({
                 email:email,
                 password:hash
                        }).then(()=>{
                         res.redirect("/")
            })
            }else{
                 res.redirect("admin/users/login")
             }

            }else{
                res.redirect("admin/users/create")
                }
                    })

    
})

router.post("/admin/user/login",(req,res)=>{
    var email = req.body.email
    var password = req.body.password
    
    User.findOne({where:{email:email}}).then(users =>{
        if(!users){
            res.redirect("admin/users/create")
            
            }else{
            bcrypt.compare(password, users.password	,( err, result)=>{
                if (result == true){
                   
                    req.session.users ={
                        id: users.id,
                        email: users.email
                    }
                    res.redirect('/admin/articles/articles');
                }else{
                    res.redirect("/admin/users/create")
                    
                   
                }
            })
         
        }
    })
    
    

})
router.get("",authAdmin,(req,res)=>{
    
})



module.exports= router