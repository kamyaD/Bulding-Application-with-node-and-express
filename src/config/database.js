 const Sequelize = require("sequelize");

//connecting to the database
module.exports = new Sequelize("library", "kamya", "kamya1", {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false, 
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
