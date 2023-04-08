const { Sequelize } = require('sequelize');
require('dotenv').config()
const connection = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASS_DB, {
    host: process.env.IP_DB,
    dialect: 'mysql',
    timezone: "-03:00"
  });
module.exports = connection