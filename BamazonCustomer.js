var mysql = require('mysql');
var inquirer = require('inquirer');
var transaction = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "", 
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    makeTable();
})

var makeTable = function() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        var tab = "\t";
        console.log("ItemID\tProduct Name\tDepartment Name\tPrice\t# In Stock");
        console.log("--------------------------------------------------------");
      
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].Item_ID + tab + res[i].ProductName + tab + res[i].DepartmentName + tab + res[i].Price + tab + res[i].StockQuantity);
        }
        console.log("--------------------------------------------------------");
        promptCustomer(res);
    });
};


var promptCustomer = function(res) {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'What would you like to purchase?'
    }]).then(function(val) {
            var correct = false;
            for (var i = 0; i < res.length; i++) {
                if (val.choice == i) {
                    console.log('Valid!')
                    var correct = true;
                    inquirer.prompt([{
                    type: 'input',
                    name: 'choice',
                    message: 'How many would you like to purchase?'
                        }]).then(function(val) {
                        if (val.choice <= res[val.choice].StockQuantity) {
                            console.log('you can buy it')
                            var newQuantity = res[val.choice].StockQuantity - val.choice;
                            console.log('There are ' + newQuantity + ' remaining')
                            console.log('Your order total is $' (res[val.choice].Price * val.choice));
                            res[val.choice].StockQuantity = newQuantity
                            makeTable();
                            }
                        else {
                            console.log("Insufficient Quantity!");
                            connection.end();
                        }
                    });
                }

            }

                if (i == res.length && correct == false) {
                    promptCustomer(res);
                }
            })
            }



