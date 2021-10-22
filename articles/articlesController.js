const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./article")
const slugify = require("slugify")

router.get("/admin/articles",(req,res) => {
        res.render("admin/articles/articles")

})


router.get("/admin/articles/articles",(req, res)=>{//select na table artigos
        Article.findAll({
                include:[
                        {model:Category}
                ]// adicionando o model category/inner join category para dar o select no title category
        }).then(article =>{
                res.render("admin/articles/articles",{article: article})
        })

})

router.get("/admin/articles/new",(req,res) => {//select nos titles de category
        Category.findAll().then(category => {
                res.render("admin/articles/new",{category: category})
        })
        
})

router.post("/articles/save",(req, res) =>{ //INSERT ARTICLES
        var title = req.body.title
        var body = req.body.body
        var category = req.body.category
        if(body != undefined){
                Article.create({
                        title: title,
                        slug: slugify(title),
                        body: body,
                        categoryId: category
                }).then(()=>{
                        res.redirect("/articles")
                })
        }

});     


module.exports = router