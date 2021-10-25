const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./article")
const slugify = require("slugify")


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
                        res.redirect("/admin/articles/articles")
                })
        }

});     

router.post("/articles/delete",(req,res) =>{ // delete article
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

router.get("/admin/articles/edit/:id",(req,res)=>{
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

router.post("/articles/update", (req, res)=>{//crud update
        var id = req.body.id
        var title = req.body.title
        var body = req.body.body
        Article.update({title:title, body:body, slug: slugify(title)},{
                where:{
                        id:id
                }
        }).then(()=>{
                res.redirect("/admin/articles/articles")
        })

        
})


module.exports = router