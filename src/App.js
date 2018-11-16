import React, { Component } from "react";
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import 'react-bootstrap';
import "./App.css";

//App components
import DollarConversion from './DollarConversion';
import BitcoinHome from './BitcoinHome';
import BitcoinSymbol from './BitcoinSymbol';
import BitcoinNewsfeed from './BitcoinNewsfeed';

const App = () => (
  <BrowserRouter>
    <div className="container">

        <Switch>
            <Route exact path="/" component={BitcoinHome} />
            <Route path="/BitcoinSymbol" component={BitcoinSymbol} />
            <Route path="/DollarConversion" component={DollarConversion} />
            <Route path="/BitcoinNewsfeed" component={BitcoinNewsfeed} />
        </Switch>
    </div>
  </BrowserRouter>
);

export default App;