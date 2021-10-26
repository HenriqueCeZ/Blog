const express = require('express')
const router = express.Router()
const User = require("./user")
const Category = require("../categories/Category")
const bcrypt = require("bcryptjs")

router.get("/admin/users",(req,res) =>{
    res.send("Listagem de usuários")
})

router.get("/admin/users/create",(req,res)=>{
    Category.findAll().then(category => {
        res.render("admin/users/create",{categories: category})
    })
})

router.get("/admin/users/login",(req,res)=>{
    Category.findAll().then(category => {
        res.render("admin/users/login",{categories: category})
    })
})

router.post("/admin/user/create",(req,res)=>{
    var login = req.body.email
    var senha = req.body.senha

    User.findOne({
        where:{email:login}
    }).then(user =>{
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(senha,salt)
            if(login!== undefined){
                User.create({
                 login:login,
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
    var login = req.body.email
    var senha = req.body.senha
    if((login && senha) !== undefined){
    User.findOne({
       where:{ login:login,
        password:senha}
    }).then( user=>{
       if(user != undefined){
           res.render("admin/categories",{user:user})
       }
       else{
           res.send("Senha incorreta")
       }
    })
    }else{
        res.redirect("admin/users/login")
    }
})

module.exports= router