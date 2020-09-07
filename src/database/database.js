// Setting Sequelize as ORM
const Sequelize = require('sequelize');

// Setting we gonna use on environment mode or development
const environment = process.env.NODE_ENV || 'development';
const config = require('../config/config')[environment];

// Give for sequelize datas of database
const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect
    }
);

module.exports = sequelize;