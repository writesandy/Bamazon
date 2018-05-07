var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "Acumed09",
    database: "bamazon_DB"
});

function start() {
    connection.query('SELECT * FROM Products', function (err,res){
        if (err) throw err;

        console.log("~~~~~~~~~~~~~~Shop Bamazon!~~~~~~~~~~~~~~")

        for(var i = 0; i < res.length; i++){
            console.log("ID: " +res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: " +res[i].Price + " | " + "Quantity: " +res[i].Stock_Quantity);
        }

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the product you would like to purchase?",
                validate: function(value) {
                    if(isNAN(value) === valse && parseInt(value) <= res.length && parseInt(value) > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?",
                validate: function(value) {
                    if(isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
         ]).then(function(ans){
             let whatBuying = ans.id;
             let howMany = parseInt(ans.quantity);
             let grandTotal = parseFloat(((res[whatBuying].Price)*howMany).toFixed(2));

             if(res[whatBuying].StockQuantity >= howMany) {
                 connection.query("UPDATE Products SET ? WHERE ?", [
                     {StockQuantity: (res[whatBuying].StockQuantity - howMany)},
                     {Item_ID: ans.id}]
                 
                 ], function(err,result) {
                     if(err) throw err;
                     console.log("Purchase Complete! Your total is $" +grandTotal.toFixed(2) + ". Your item(s) will be shipped to you for delivery tomorrow.")
                 })
             }

    }


    )};

    start();
