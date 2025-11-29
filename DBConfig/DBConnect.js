const mysql = require('mysql2');

const connection= mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"7997768268",
    database:"asghar",
});
connection.connect((error)=>{
    if(error) throw error;
    //console.log("database is connected");
    });

module.exports = connection;
