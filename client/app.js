/**
 * Created by Adil Imam on 11/18/2017.
 */
import axios from 'axios';

var searchQueries={
    search1:'cereal',
    search2:'cold+cereal'
};

var brandNames={
    brand1: "Cheerios",
    brand2: "Kashi",
    brand3: "Kellogg's",
    brand4: "Post",
}


axios.get('/request-walmart-products').then(response=>{
    var productSet=response.data;
//Indexing starts from 0
    $('#table_id').DataTable({
        responsive: true,
        data: productSet,
        columnDefs : [{
            "targets" : 0,
            "data": "mediumImage",
            "render" : function (data, type, full) {
                return '<img height="48px" width="48px" src="'+data+'"/>';
            }},{
            "targets" : 4,
            "data": "customerRatingImage",
            "render" : function (data, type, full) {
                return '<img height="100%" width="80%" src="'+data+'"/>';
            }}],
        columns: [
            { data: "mediumImage" },
            { data: "name" },
            { data: "brandName" },
            { data: "salePrice" },
            { data: "customerRatingImage"},
            { data: "query"}
        ]
    });

}).catch(error=>{
    console.log(error);
});

/*
//Query Walmart Search API
axios.post('/walmart-search-api', searchQueries)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });

/*
//Get percentage of search results owned by each brand
axios.post('/percentage-of-brands', brandNames)
    .then(response => {
        console.log("1: ",response.data);
    })
    .catch(error => {
        console.log(error);
    });



axios.post('/percentage-of-brands-in-top3-search-results', brandNames)
    .then(response => {
        console.log("2: ",response.data);
    })
    .catch(error => {
        console.log(error);
    });
*/
/*
$(document).ready(function() {
    $('#table_id').DataTable( {
        responsive: true,
        data: dataSet,
        columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ]
    });
});
*/




