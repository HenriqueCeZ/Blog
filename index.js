const express = require('express');
const app = express();
const connection = require('./database/database')
const categoriesController = require('./categories/categoriesController')
const articlesController = require('./articles/articlesController')
const Article = require("./articles/article")
const Category = require("./categories/category")

connection 
        .authenticate()
        .then(()=>{
            console.log("Conexão feita com sucesso!"); 
        }).catch((error) => {
            console.log(error)      
        })


app.set('view engine','ejs'); 

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'))





app.use("/",categoriesController)
app.use("/",articlesController)

app.get("/", (req, res) =>{
    res.render("index");
})

app.listen(8080,()=>{
    console.log('app rodando!')
})