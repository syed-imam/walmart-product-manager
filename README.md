# Walmart Product Manager
Walmart Product Manager is a full stack web application that enables automated data collection from walmart API and provides useful user interface to the research team.
## Features
1. Node cron job queries the walmart API in fixed intervals of time.
2. Data retrieved from Walmart API persisted inside MongoDB.
3. Complete searchable and sortable products table presenting information about products with editable brandNames and auto suggestion of brands.
4. Statistics on given search brands in Walmart API in a given time range.
### Prerequisites
Need to have node and npm installed. <br>
Note that the application was developed and tested on: node --version: 6.9.4, npm --version 3.10.10 <br>
Application is tested on windows 10 and MacOS Sierra version 10.12.6
### Installing
Simple 3 steps
1. git clone https://github.com/adilimam1993/walmart-product-manager.git
2. npm install
3. npm start
4. Open browser with url: http://localhost:3000
### How to Use it
There are 2 tabs in the index page <br>
Tab 1 (Products Table) loads and displays the products table 
![Alt text](https://s3.amazonaws.com/adil-static-test/page1.png "Products Table");

Tab 2 (Brand Statistics) renders the brand statistics <br>
Note: Initial render of this page will generate percentages with default params(query="cereal", startTime=00:00:00, limitTime=23:59:59, all search results)
![Alt text](https://s3.amazonaws.com/adil-static-test/page2.png "Products Table");

## Authors
* **Syed Adil Imam** - [author](http://syedadilimam.com/)




