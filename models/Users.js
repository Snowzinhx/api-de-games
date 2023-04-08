const Sequelize = require('sequelize');
const connection = require('../database/database')

const Users = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
})
// Users.sync({ force: true }).then(()=>{
//     console.log("✅| Criada tabela de users.")
// }).catch(err=>{
//     console.log(err)
// })
module.exports = Users;
