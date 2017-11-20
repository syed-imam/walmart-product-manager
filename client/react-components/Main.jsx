import React, { Component } from "react";
import {Route, NavLink, BrowserRouter} from "react-router-dom";
import ProductsTable from './ProductsTable';
import BrandStatistics from './BrandStatistics';

class Main extends Component {

    render() {
        return (
                <BrowserRouter>
                    <div className="container">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Products Table</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/brand-statistics">Brand Statistics</NavLink>
                            </li>
                        </ul>
                        <div className="content">
                            <Route path="/products" component={ProductsTable}/>
                            <Route path="/brand-statistics" component={BrandStatistics}/>
                       </div>
                    </div>
                </BrowserRouter>
        );
    }
}
export default Main;

