 const Sequalize= require('sequelize');
const db = require('../config/database');

const ChildrenModel = db.define('children',{
    child_id: {
        type: Sequalize.INTEGER
    },
    name: {
        type: Sequalize.STRING
    },
    age: {
        type: Sequalize.INTEGER
    },
    gender: {
        type: Sequalize.STRING
    },
    back_ground: {
        type: Sequalize.STRING
    },
    summary: {
        type: Sequalize.STRING
    },
    image: {
        type: Sequalize.STRING
    }
});
module.exports = ChildrenModel;