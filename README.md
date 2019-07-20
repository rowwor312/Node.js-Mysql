# Node.js-Mysql
Node.JS/Mysql HWK


Notes:
This app is using a MySQL database and node to query the database and place orders using prompts, user input, and updating tables.

Schema is below with initial database information.

![image of schema](/images/schemapic.png)


Screenshot: 
Screenshot from the application showing the table of products available for purchase. This used the console.table npm package to display the table of products from MySQL database. The inquirer npm package is used to prompt the user. If the user chooses a larger quantity than what is in stock, the user is requested to select a smaller quantity. 

Also, displays order with sufficient quantities being placed which uses the mysql npm package to query the database. Calculates cost with quantity order and returns total cost to the console. 

![image of screenshot 1](/images/bamazonrun1.png)

![image of screenshot 1](/images/productsdbout1.png)


Screenshot shows user replying "Yes" to start a new order. If selected yes, all products for sale will display and be prompted to select again. If selected no, connection to database ends and console will display thanks for shopping. 

![image of screenshot 1](/images/bamazonrun2.png)

![image of screenshot 1](/images/productsdbout2.png)
