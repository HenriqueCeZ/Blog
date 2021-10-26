const sequelize = require('sequelize')
const connection = require('../database/database')

const User = connection.define('users',{
    login:{
        type: sequelize.STRING,
        allowNull:false
    },password:{
        type:sequelize.STRING,
        allowNull: false
    }
})

User.sync({force:false}) // criando tabela no bd. O force false não recria a tabela


module.exports = User;