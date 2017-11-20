import React, { Component } from "react";
import axios from 'axios';
import {Table} from 'react-bootstrap';

class ProductsTable extends React.Component{

    componentDidMount(){
        axios.get('/request-walmart-products').then(response=>{
            var productSet=response.data;
            $('#table_id').DataTable({
                responsive: true,
                data: productSet,
                columnDefs : [{
                    "targets" : 0,
                    "data": "mediumImage",
                    "render" : function (data, type, full) {
                        console.log(full);
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
                            return '<div> '+full.name+' <a href=""><i className="fa fa-external-link" aria-hidden="true"></i></a></div>';
                        }
                    },
                    {
                        "targets": 2,
                        "render": function (data, type, full) {
                            return '<div> <input value="'+full.brandName+'"></div>';
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

        }).catch(error=>{
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Table id="table_id" className="table-hover">
                    <thead className="thead-dark">
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

/*     <div className="well">
                    <table className="table" id="table_id">
                        <thead className="thead-dark">
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
                    </table>
                </div>
           */