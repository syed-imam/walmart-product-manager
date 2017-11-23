import React, { Component } from "react";
import axios from 'axios';
import {Table} from 'react-bootstrap';

class ProductsTable extends React.Component{

    constructor(props){
        super();
    }

    componentWillMount(){
        axios.all([
            axios.get('/request-walmart-brands'),
            axios.get('/request-walmart-products')
        ]).then(axios.spread((res1, res2) => {
            let brandsResult=res1.data;
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
                        "targets" : 6,
                        "data": "customerRatingImage",
                        "render" : function (data, type, full) {
                            if(data === undefined){
                                return '<div style="margin-left:15%" class="text-justify text-danger">None<div>';
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
                         "data":"brandName",
                        "render": function (data, type, full) {
                            full.brandName= full.brandName === undefined ? 'Brand Name Not Available' : full.brandName;
                            return '<div id="bs-example">'+
                                   ' <div class="row"><div class="col-md-8">' +
                                          '<input class="typeahead tt-query custom-query" autocomplete="on" spellcheck="false" value="'+full.brandName+'"/></div>'+
                                            '<div class="col-lg-4"><button data-toggle="tooltip" title="Save" onclick="saveBrandValue(\'' + full._id + '\', this.parentNode.previousElementSibling.childNodes[0].childNodes[1].value)" '+
                                               'class="btn btn-default btn-round-sm btn-sm save-button"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>'+
                                           '</div>'+
                                        '</div>'+
                                    '</div>';
                        }
                    },
                    {
                        "targets":3,
                        "data":"salePrice",
                        "render": function (data, type, full) {
                            data=data === undefined ? '<div style="margin-left:5%" class="text-justify text-danger">None<div>' : '$'+data;
                            return '<div>'+data+'</div>';
                        }
                    },
                    {
                        "targets":4,
                        "data":"msrp",
                        "render": function (data, type, full) {
                            data=data === undefined ? '<div style="margin-left:5%" class="text-justify text-danger">None<div>' : '$'+data;
                            return '<div>'+data+'</div>';
                        }
                    }
                ],
                columns: [
                    { data: "mediumImage" },
                    { data: "name" },
                    { data: "brandName"},
                    { data: "salePrice" },
                    { data: "msrp"},
                    { data: "query"},
                    { data: "customerRatingImage"},
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
                        <th scope="col">Price</th>
                        <th scope="col">MSRP</th>
                        <th scope="col">Search Term</th>
                        <th scope="col">Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>

                <div className="modal fade" id="submitModal" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Brand Update</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h4>Brand updated successfully</h4>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        );
    }
}


export default ProductsTable;
