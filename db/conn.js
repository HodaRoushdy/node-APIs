require('dotenv').config()
const mysql = require("mysql");


//Create Database Connection
const conn = mysql.createConnection({
    host: process.env.HOST,
    user:"admin",
    password: process.env.PASS,
    database:process.env.DATA_BASE,
    port: process.env.PORT,
    multipleStatements: true, 
});


module.exports = {conn}