var mysql = require('mysql');
var inquirer = require('inquirer');

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
                                        connection.query('SELECT * FROM Products WHERE ItemID=?', transaction[0].ItemID, function(err, res){})
                                    }
                                    else {
                                        connection.end();
                                        console.log('you cannot buy it')
                                    }
                                });
                            }

	                //1. TODO: IF THE PRODUCT EXISTS, SET correct = true and ASK THE USER TO SEE HOW MANY OF THE PRODUCT THEY WOULD LIKE TO BUY//
	               	//2. TODO: CHECK TO SEE IF THE AMOUNT REQUESTED IS LESS THAN THE AMOUNT THAT IS AVAILABLE//                       
	                //3. TODO: UPDATE THE MYSQL TO REDUCE THE StockQuanaity by the THE AMOUNT REQUESTED  - UPDATE COMMAND!
	                //4. TODO: SHOW THE TABLE again by calling the function that makes the table
                }

                //IF THE PRODUCT REQUESTED DOES NOT EXIST, RESTARTS PROMPT//
                if (i == res.length && correct == false) {
                    promptCustomer(res);
                }
            })
            }



