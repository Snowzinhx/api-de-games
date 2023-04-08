const Sequelize = require('sequelize');
const connection = require('../database/database')

const Games = connection.define('games', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})
// Games.sync({ force: true }).then(()=>{
//     console.log("✅| Criada tabela de jogos.")
// }).catch(err=>{
//     console.log(err)
// })
module.exports = Games;
