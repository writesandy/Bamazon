const mysql = require('mysql');
const inquirer = require('inquirer');


let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "Acumed09",
    database: "bamazon_DB"
});

function start() {
    connection.query('SELECT * FROM Products', function (err,res){
        if (err) throw err;

        console.log("~~~~~~~~~~~~~~Shop Bamazon!~~~~~~~~~~~~~~");

        for(var i = 0; i < res.length; i++){
            console.log("ID: " +res[i].Item_ID + " | " + "Product: " + res[i].Product_Name + " | " + "Department: " + res[i].Department_Name + " | " + "Price: " +res[i].Price + " | " + "Quantity: " +res[i].Stock_Quantity);
        }

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the product you would like to purchase?",
                validate: function(value) {
                    if(isNaN(value) === false && parseInt(value) <= res.length && parseInt(value) > 0) {
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
             let whatBuying = (ans.id)-1;
             let howMany = parseInt(ans.quantity);
             let grandTotal = parseFloat(((res[whatBuying].Price)*howMany).toFixed(2));

             if(res[whatBuying].Stock_Quantity >= howMany) {
                 connection.query("UPDATE Products SET ? WHERE ?", [
                     {Stock_Quantity: (res[whatBuying].Stock_Quantity - howMany)},
                     {Item_ID: ans.id}
                    
                ], function(err,result) {
                     if(err) throw err;
                     console.log("Purchase Complete! Your total is $" +grandTotal.toFixed(2) + ". Your item(s) will be shipped to you for delivery tomorrow.")

                    });


                 connection.query("SELECT * FROM Departments", function (err, deptRes) {
                     if (err) throw err;
                     let index;
                     for(let i = 0; i < deptRes.length; i++){
                         if(deptRes[i].Department_Name === res[whatBuying].DepartmentName) {
                             index = i;
                         }
                     }


                 connection.query("UPDATE Departments SET ? WHERE ?", [
                     {TotalSales: deptRes[index].TotalSales + grandTotal},
                    {Department_Name: res[whatBuying].Department_Name}
                 ], function (err, deptRes) {
                     if (err) throw err;
                 });
            });

                } else {
            console.log("sorry, there's not enough in stock!");
        }


        askAgain();
    });

});

}

function askAgain(){
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase something else?"
    }]).then(function(ans){
        if(ans.reply) {
            start();
        } else {
            console.log("Thank you for your purchase!");
        }
    });
}

    start();
