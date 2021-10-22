const express = require('express')
const router = express.Router()
const Category = require("./category")
const slugify = require("slugify")

router.get("/admin/categories/new",(req,res) =>{
          res.render("admin/categories/new")        

});
router.post("/categories/save",(req,res) =>{ //crud insert
        var title = req.body.title;
        if(title != undefined){ 
                Category.create({
                        title: title,
                        slug: slugify(title)
                }).then(()=>{
                        res.redirect("/admin/categories/");
                })
                 
        }else{
                res.redirect("/admin/categories/new");
        }       

})
router.get("/admin/categories",(req,res)=>{ //crud select

        Category.findAll().then(categories=>{
                res.render("admin/categories/index",{categories:categories})
        })

        

})
router.post("/categories/delete",(req,res) =>{ //crud delete
        var id = req.body.id;
        if(id!=undefined){
                if(!isNaN(id)){
                        Category.destroy({
                                where:{
                                        id : id
                                }
                               
                        }).then(()=>{
                                res.redirect("/admin/categories");
                        })
                        
 //verifica se é um número
                }else{
                        res.redirect("/admin/categories")
                }
        }else{
                res.redirect("/admin/categories")
        }

})

router.get("/admin/categories/edit/:id",(req,res)=>{// pegando o Id pelo get através do edit e passando para varíavel category e renderizando a view de edit 
       var id = req.params.id; 
       if(isNaN(id)){
        res.redirect("/admin/categories")
       } 
       
       Category.findByPk(id).then(category =>{
        if(id != undefined){
               res.render("admin/categories/edit",{category:category});
       
       }
        else{
                res.redirect("/admin/categories")
        }}).catch(erro =>{
                res.redirect("/admin/categories")
        })

        
});

router.post("/categories/update", (req, res)=>{//crud update
        var id = req.body.id
        var title = req.body.title
        Category.update({title:title},{
                where:{
                        id:id
                }
        }).then(()=>{
                res.redirect("/admin/categories")
        })

        
})

module.exports= router