import React, { Component } from "react";
import {Route, Link, HashRouter} from "react-router-dom";
import ProductsTable from './ProductsTable';
import BrandStatistics from './BrandStatistics';

class Main extends Component {

    render() {
        return (
                <HashRouter>
                    <div className="container">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Products Table</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/brand-statistics">Brand Statistics</Link>
                            </li>
                        </ul>
                        <div className="content">
                            <Route exact path="/" component={ProductsTable}/>
                            <Route path="/brand-statistics" component={BrandStatistics}/>
                       </div>
                    </div>
                </HashRouter>
        );
    }
}
export default Main;


