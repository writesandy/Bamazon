var mysql = require('mysql');
var inquirer = require('inquirer');
var bamazon = require('./bamazon.sql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "Acumed09",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
 //   start();

});

// function start () {
//     inquirer
//     .prompt({

//     })
// }
