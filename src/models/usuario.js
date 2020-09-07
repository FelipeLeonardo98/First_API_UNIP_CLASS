// Setting we're using sequelize
const Sequelize = require('sequelize');

//Getting datas of connection between sequelize and MySQL SGBD
const sequelize = require('../database/database.js');

// Create table into DB and your fields
const Usuario = sequelize.define("usuario", {
    id:
    {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nome:
    {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3, 100]
        }
    },
    salario: {
        allowNull: false,
        type: Sequelize.DOUBLE(),
        validate: {
            len: [1, 999999]
        }
    },
    dataNascimento: {
        allowNull: false,
        type: Sequelize.DATE()
    },
    ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN(),
        defaultValue: true
    }
});

// Exporting Model Usuario (table into Database)
module.exports = Usuario;