import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login, SignUp, Home } from '../Screens'


const Routes = () => (
    <Router>
        <div>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={SignUp} />
            <Route path="/home" exact component={Home} />
            {/* <Route path="/location" component={Location} />
            <Route path="/Songs" component={Songs} /> */}
        </div>
    </Router>
);

export default Routes;