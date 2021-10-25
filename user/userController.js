const express = require('express')
const router = express.Router()
const User = require("./user")

router.get("/admin/users",(req,res) =>{
    res.send("Listagem de usuários")
})

router.get("/admin/users/create",(req,res)=>{
    res.send("Form")
})

module.exports= router