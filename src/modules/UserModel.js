const Sequalize= require('sequelize');
const db = require('../config/database');

const UserModel = db.define('users',{
    username: {
        type: Sequalize.STRING
    },
    password: {
        type: Sequalize.STRING
    },
    email: {
        type: Sequalize.STRING
    }

});
module.exports = UserModel;