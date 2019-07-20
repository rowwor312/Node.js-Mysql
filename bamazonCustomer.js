    var mysql = require("mysql");
	var inquirer = require("inquirer");
	var table = require("console.table");
	
	var connection = mysql.createConnection({
	    host: "localhost",
	
	    // Port 3306
	    port: 3306,
	
	    // Username
	    user: "root",
	
	    // Password
	    password: "rowwebdevelop2019$",
	    database: "bamazon"
	});
	
	connection.connect(function (err) {
	    if (err) throw err;
	    console.log("\nWelcome to Products-4-Sale! \n\nPlease select an item from the table below.\n");
	   
	    stockProducts();
	});
	

	function stockProducts() {
	    // Database Query from Products.
	    connection.query("SELECT * from products;", function(err, results, fields) {
	        if (err) throw err;
	        else {
	        // Console log products into a table.
	        console.table(results);
	        
	      }
	      selectProduct();
	     
	    }
	    
        )}

        function selectProduct() {
            inquirer
                .prompt([
                {
                  name: "product",
                  type: "input",
                  message: "Please select the item_id of the product you would like to buy?"
                },
                {
                  name: "quantity",
                  type: "input",
                  message: "Please enter the quantity you would you like to buy?"
                }
                ])
                .then(function(answer) {
                    
                    
                    var product = answer.product;
                    var quantity = answer.quantity;
                    
                    var queryProducts = "SELECT * FROM products WHERE ?";
                    var cost 
                    connection.query(queryProducts, {item_id: product}, function(err, res) {
                        var productInfo = res[0];
                        if (err) throw err;
                        if (quantity > productInfo.stock_quantity) {
                            console.log("\n");
                            console.log("Please choose a smaller quantity. There is not enough stock to fill your order.");
                            console.log("\n"); 
                            stockProducts()
                            
                        }
                        
                         else {
                            if (quantity <= productInfo.stock_quantity) {
                                console.log("\n");
                                console.log("We have " + quantity + " " + productInfo.product_name + "s in stock for your order!")
                                console.log("\n"); 
                                console.log("\n");
                                
                            } 
                            if (cost = quantity * productInfo.price) {
                                console.log("The total cost of your order is $" + cost);
                                console.log("\n"); 
                            }
                            
                    var queryUpdate = "UPDATE products SET ? WHERE ?"
                    connection.query(queryUpdate, [{stock_quantity: productInfo.stock_quantity - answer.quantity},{item_id: product}], function(err, res) {
                         if (err) throw err;
                         else  {   
                            console.log("\n");  
                            console.log("Inventory has been updated!");
                            console.log("\n"); 
                                           
                            inquirer
                            .prompt({
                             name: 'next',
                             type: "input",
                             message: 'Would you like to place another order (Yes/No)?',
                             })
                           .then(function(answer) {
                               if (answer.next === "Yes") {
                                   stockProducts();
                               } else {
                                 connection.end()
                                 console.log("\n");
                                 console.log("Thank you for shopping with us today!")
                                 console.log("\n");
                               }
                             
                           });
                            
                             
                               }
                         })
                             }
         
     
                         
                     })
                  
                 })
         
                 
                 }
     
           