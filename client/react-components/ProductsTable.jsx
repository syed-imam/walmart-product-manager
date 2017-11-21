import React, { Component } from "react";
import axios from 'axios';
import {Table} from 'react-bootstrap';

class ProductsTable extends React.Component{
    componentDidMount(){
        axios.get('/request-walmart-products').then(response=>{
            var productSet=response.data;
            //Generating table from Datatables
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
                    }},
                    {
                        "targets": 1,
                        "render": function (data, type, full) {
                            return '<div> '+full.name+' <a href=""><i class="fa fa-external-link" aria-hidden="true"></i></a></div>';
                        }
                    },
                    {
                        "targets": 2,
                        "render": function (data, type, full) {
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

            // Defining the local dataset
            var cars = ['Audi', 'BMW', 'Bugatti', 'Ferrari', 'Ford', 'Lamborghini', 'Mercedes Benz', 'Porsche', 'Rolls-Royce', 'Volkswagen'];

            // Constructing the suggestion engine
            var cars = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: cars
            });
            // Initializing the typeahead
            $('.typeahead').typeahead({
                    hint: true,
                    highlight: true, /* Enable substring highlighting */
                    minLength: 1 /* Specify minimum characters required for showing result */
                },
                {
                    name: 'cars',
                    source: cars
                });

    }).catch(error=>{
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
                        <th scope="col">Query</th>
                        <th scope="col">Sale Price</th>
                        <th scope="col">Image</th>
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
