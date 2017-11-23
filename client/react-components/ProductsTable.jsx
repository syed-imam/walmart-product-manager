import React, { Component } from "react";
import axios from 'axios';
import {Table} from 'react-bootstrap';

class ProductsTable extends React.Component{

    constructor(props){
        super();
        console.log(props);
    }

    componentWillMount(){
        axios.all([
            axios.get('/request-walmart-brands'),
            axios.get('/request-walmart-products')
        ]).then(axios.spread((res1, res2) => {
            let brandsResult=res1.data;
            console.log(brandsResult);
            let productSet=res2.data;

            //Generating table from Datatables
            $('#table_id').DataTable({
                responsive: true,
                data: productSet,
                columnDefs : [{
                    "targets" : 0,
                    "data": "mediumImage",
                    "render" : function (data, type, full) {
                        data= data === undefined ? '../img/img-not-found.jpg' : data;
                        return '<img height="48px" width="48px" src="'+data+'"/>';
                    }},
                    {
                        "targets" : 4,
                        "data": "customerRatingImage",
                        "render" : function (data, type, full) {
                            if(data === undefined){
                                data='../img/img-not-found.jpg';
                                return '<img height="40%" width="15%" src="'+data+'"/>';
                            }
                            else{
                                return '<img height="100%" width="80%" src="'+data+'"/>';
                            }}},
                    {
                        "targets": 1,
                        "render": function (data, type, full) {
                            full.productUrl= full.productUrl === undefined ? '#' : full.productUrl;
                            return '<div> '+full.name+' <a href="'+full.productUrl+'" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a></div>';
                        }
                    },
                    {
                        "targets": 2,
                        "render": function (data, type, full) {
                            full.brandName= full.brandName === undefined ? 'Brand Name Not Available' : full.brandName;
                            return '<div id="bs-example" style="float:left"> <input class="typeahead tt-query" autocomplete="on" spellcheck="false" value="'+full.brandName+'"/><button data-toggle="tooltip" title="Save" onclick="saveBrandValue(\'' + full._id + '\', this.previousElementSibling.childNodes[1].value)" style="background-color:#101010cc; border:radius:10%; margin-left: 2px; color:white;" class="btn btn-default btn-round-sm btn-sm"><i class="fa fa-floppy-o" aria-hidden="true"></i></button></div>';
                        }
                    }
                ],
                columns: [
                    { data: "mediumImage" },
                    { data: "name" },
                    { data: "brandName" },
                    { data: "salePrice" },
                    { data: "customerRatingImage"},
                    { data: "query"}
                ]
            });

            // Constructing the suggestion engine
            var brandsSet = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: brandsResult
            });
            // Initializing the typeahead
            $('.typeahead').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                    name: 'brands',
                    source: brandsSet
                });

            $("#table_id_paginate").click(function(){

                $('.typeahead').typeahead('destroy'); //i need to use this clear already created typeahead()!
                // Initializing the typeahead
                $('.typeahead').typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    },
                    {
                        name: 'brands',
                        source: brandsSet
                    });
            });

        })).catch(error => {
            console.log(error);
        });

    }

render() {
        return (
            <div>
                <Table id="table_id" className="table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Name</th>
                        <th scope="col">Brand name</th>
                        <th scope="col">Query Time</th>
                        <th scope="col">Customer Ratings</th>
                        <th scope="col">Search Term</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </div>
        );
    }
}


export default ProductsTable;
