# Walmart Product Manager
Walmart Product Manager is a Web Application that enables automated data collection from Walmart Search API and provides useful user interface to the research team.

### Features 
1. **Automatic Data collection** - Node cron job queries the Walmart Search API in fixed intervals of time (20 minutes) <br>
   (Duration of the time interval can be changed inside config/config.js).
2. **Data Persistence** - Data fetched from Walmart API is persisted inside MongoDB service hosted on mlab.
3. **Products Table** - Complete searchable and sortable products table presenting information about products with editable brand names 
    and auto suggestion of brands is made available.
4. **Brand Statistics** - Statistics related to percentages of brands appearing in API search results for given search query and time range are shown 
    using circle percentages.

### Technology Used
Application uses Node and Express for the backend functionality. Additionally it uses React, and Jquery in the front end. MongoDB is used as the persistent database with Mongoose(ORM) primarily because of non-relational structure of data. Libraries like DataTables.js and Typeahead.js are used for faster development time.      

### Prerequisites
1. Need to have node and npm installed. <br>
2. Note that the application was developed and tested on: node --version: 6.9.4, npm --version 3.10.10 <br>
3. Furthermore application is tested on windows 10, MacOS Sierra version 10.12.6 machines using recent version of Google chrome.

### Installation
1. git clone https://github.com/adilimam1993/walmart-product-manager.git
2. cd into project's root directory 
2. run "npm install" to install all the dependencies.
3. Make sure no other app is already listening on port 3000. If there is, change PORT_NUMBER inside .env file in project's root directory.
3. run "npm start".
4. After few seconds, you should see a message saying "Server started on port xxxx". 
5. Open browser with url: http://localhost:3000
### How to Use it
There are 2 tabs on the index page <br>
<br>
Tab 1 renders the Products Table 
1. Products table is loaded and displayed with editable brand name.
2. Editing and saving the changed brand name updates the brand name of the corresponding product in the database.
3. Table is searchable with any keyword.
4. Name, Price and search term are all sortable fields.
5. Green Button in the top right corner allows for additional ability to manually query the API and save data in the database. 
<br>

![Alt text](https://s3.amazonaws.com/adil-static-test/products.png "Products Table")

Tab 2 (Brand Statistics) renders the brand statistics 

1. Initial render of this page will generate percentages with default params.
(query="cereal", startTime=00:00:00, limitTime=23:59:59, brand 1 = "Cheerios", brand 2="Kashi" brand 3="Kellog's" brand 4="Post")
2. Form on the brand statistics page allows percentages of brands to be determined based on inputted 4 brands, time range of the query.
 and the search query itself.
3. Note: Percentages are calculated as per the requirements. The products which did not have any brand name returned from the API are also considered 
  when calculating the percentages.
<br>
  
![Alt text](https://s3.amazonaws.com/adil-static-test/stat.png "Brand Statistics")

### Possible Modification 
As per requirements, the API was queried with search terms ["cereal", "cold cereal"]. However, these queries can be modified in 
the file "/server/controllers/product.controller.js" inside functions (manualQueryWalmartApi, QueryWalmartApi) to make new requests with different search terms.

### Possible Performance Enhancement
For Future, performance can be enhanced by making fresh ajax calls on each page change, instead of fetching all the data at once. Additionally, lazy loading of some packages can also decrease the load time.

## Author
* **Syed Adil Imam** - (http://syedadilimam.com/)




