# Walmart Product Manager
Walmart Product Manager is a Web Application that enables automated data collection from Walmart API and provides useful user interface to the research team.
## Features 
1. **Automatic Data collection** - Node cron job queries the walmart API in fixed intervals of time (20 minutes) <br>
   (Duration of the time interval can be changed inside config/config.js).
2. **Data Persistence** - Data fetched from Walmart API is persisted inside MongoDB service hosted on mlab.
3. **Products Table** - Complete searchable and sortable products table presenting information about products with editable brand names <br>
    and auto suggestion of brands is made available.
4. **Brand Statistics** Statistics related to percentages of brands appearing in API search results for given search query and time range are shown <br>
    using circle percentages.
### Prerequisites
Need to have node and npm installed. <br>
Note that the application was developed and tested on: node --version: 6.9.4, npm --version 3.10.10 <br>
Furthermore Application is tested on windows 10, MacOS Sierra version 10.12.6 machines using recent version of Google chrome.
### Installation
1. git clone https://github.com/adilimam1993/walmart-product-manager.git
2. cd into project's root directory 
2. run "npm install" to install all the dependencies.
3. Make sure no other app is already listening on port 3000. If there is, change PORT_NUMBER inside .env file in project's root directory.
3. run "npm start" to run webpack and babel.
4. You should see a message called "Server started on port xxxx". 
5. Open browser with url: http://localhost:3000
### How to Use it
There are 2 tabs on the index page <br>
1. Tab 1 (Products Table) loads and displays the products table 
2. Green Button in the top right corner allows for additional ability to manually query the API and save data in the database. 
<br>

![Alt text](https://s3.amazonaws.com/adil-static-test/products.png "Products Table")

Tab 2 (Brand Statistics) renders the brand statistics <br>
1. Initial render of this page will generate percentages with default params<br>
(query="cereal", startTime=00:00:00, limitTime=23:59:59, brand 1 = "Cheerios", brand 2="Kashi" brand 3="Kellog's" brand 4="Post")
2. Form on the brand statistics page allows percentages of brands to be determined based on inputted 4 brands, time range of tbe query,<br>
 and the search query itself
  <br>
3. Note: Percentages are calculated as per the requirements. The products which did not have any brand name returned from the API are also considered <br>
  when calculating the percentages.
![Alt text](https://s3.amazonaws.com/adil-static-test/stat.png "Brand Statistics")
<br>
###Possible Modification 
As per requirements, the API was queried with search terms ["cereal", "cold cereal"]. However, they can be modified in the <br>
file /server/controllers/product.controller.js inside functions (manualQueryWalmartApi, QueryWalmartApi) to make new requests with <br>
different search terms.

## Author
* **Syed Adil Imam** - [author](http://syedadilimam.com/)




