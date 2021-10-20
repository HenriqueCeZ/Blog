const sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/category')

const Article = connection.define('articles',{
    title:{
        type: sequelize.STRING,
        allowNull:false
    },
    slug:{
        type: sequelize.STRING,
        allowNull: false
    },
    body:{
        type: sequelize.TEXT,
        allowNull: false
    }
})
Category.hasMany(Article)// Uma Category tem muitos Articles
Article.belongsTo(Category)//Um article pertence a uma Category relacionamento 1:1




module.exports = Article;