const express = require('express');
const app = express();
const connection = require('./models/database')

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

app.get("/", (req, res) =>{
    res.render("index");
})

app.listen(8080,()=>{
    console.log('app rodando!')
})