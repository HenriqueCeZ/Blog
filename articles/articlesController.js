const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./article")
const slugify = require("slugify")
const adminAuth = require('../middlewares/adminAuth')


router.get("/admin/articles/articles",adminAuth ,(req, res)=>{//select na table artigos
        Article.findAll({
                include:[
                        {model:Category}
                ]// adicionando o model category/inner join category para dar o select no title category
        }).then(article =>{
                res.render("admin/articles/articles",{article: article})
        })

})

router.get("/admin/articles/new",adminAuth ,(req,res) => {//select nos titles de category
        Category.findAll().then(category => {
                res.render("admin/articles/new",{category: category})
        })
        
})

router.post("/articles/save",adminAuth ,(req, res) =>{ //INSERT ARTICLES
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
                        res.redirect("/admin/articles/articles")
                })
        }

});     

router.post("/articles/delete",adminAuth ,(req,res) =>{ // delete article
        var id = req.body.id;
        if(id!=undefined){
                if(!isNaN(id)){
                        Article.destroy({
                                where:{
                                        id : id
                                }
                               
                        }).then(()=>{
                                res.redirect("/admin/article/article");
                        })
                        
 //verifica se é um número
                }else{
                        res.redirect("admin/articles/articlese")
                }
        }else{
                res.redirect("admin/articles/articles")
        }

})

router.get("/admin/articles/edit/:id",adminAuth ,(req,res)=>{
        var id = req.params.id; 
        if(isNaN(id)){
         res.redirect("/admin/articles/articles")
        } 
        Article.findOne({
                where:{
                    id:id
                }
            }).then( article =>{
                    if(article != undefined){
                        Category.findAll().then(category=>{
                            res.render("admin/articles/edit", {article: article, category: category});
                    })
                    
                }
        })             
})  

router.post("/articles/update", adminAuth ,(req, res)=>{//crud update
        var id = req.body.id
        var title = req.body.title
        var body = req.body.body
        var category =req.body.category
        Article.update({title:title, body:body,categoryId:category, slug: slugify(title)},{
                where:{
                        id:id
                }
        }).then(()=>{
                res.redirect("/admin/articles/articles")
        }).catch(err=>{
                res.redirect("/")
        })

        
})

router.get("/articles/page/:num",adminAuth ,(req, res)=>{
        var page = req.params.num
        var offset = 0
        if(isNaN(page)|| page == 1){
                offset = 0;
        }else{
              offset= parseInt(page)*2
        }
        Article.findAndCountAll({
                limit:4,
                offset: offset
        }).then(articles =>{
                var next;
                if(offset + 5 >= articles.count){
                        next = false
                }else{
                        next = true
                }

                var result ={
                        next:next,
                        articles: articles
                }
                
                Category.findAll().then(categories=>{
                        res.render("admin/articles/page",{result:result,categories:categories})
                })
        })

        
})


module.exports = router