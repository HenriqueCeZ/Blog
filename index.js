const express = require('express');
const app = express();
const connection = require('./database/database')
const categoriesController = require('./categories/categoriesController')
const articlesController = require('./articles/articlesController')
const userController = require("./user/userController")
const user = require('./user/user')
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
app.use("/",userController)

app.get("/", (req, res) =>{
    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles =>{
        Category.findAll().then(categories=>{
            res.render("index", {articles: articles, categories: categories});
        })

        
    });
   
})
app.get('/:slug',(req,res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then( article =>{
            if(article != undefined){
                Category.findAll().then(categories=>{
                    res.render("article", {article: article, categories: categories});
            })
            
        }else{
                res.redirect("/")
            }
    
        }).catch(err =>{
                 res.redirect("/")
            })
        })    

app.get("/category/:slug", (req, res) =>{
        var slug = req.params.slug
        Category.findOne({
            where:{
                slug: slug
            },
            include:[
                {model: Article}
            ]
        }).then( category =>{
                Category.findAll().then(categories =>{
                    res.render("index",{articles: category.articles, categories: categories})
                })
                
          
        }).catch(err =>{
            res.redirect("/")
        })
})                     

app.listen(8080,()=>{
    console.log('app rodando!')
})