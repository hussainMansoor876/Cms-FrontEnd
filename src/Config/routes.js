import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from '../Components/Login/Login';
import SignUp from '../Components/Login/SignUp'
import { connect } from 'react-redux'
import SessionStorageManager from './SessionStorageManager';

import Dashboard from '../Components/Dashboard/Dashboard'
import AllJobs from '../Components/AllJobs/Alljobs'
import Header from '../Components/Header/Header';
import Navbar from '../Components/Navbar/Navbar';
import PostJob from '../Components/PostJob/PostJob';
import EditJob from '../Components/EditJob/EditJob';


function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => isLoggedIn === true ? (
                <Component {...props} />
            ) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
            }
        />
    );
}


class Routes extends Component {

    state = {
        isLoggedIn: false,
        user: null,
    }

    UNSAFE_componentWillMount() {
        const user = SessionStorageManager.getUser();
        if (user) {
            this.setState({ isLoggedIn: true, user })
        }
    }


    render() {
        const user = SessionStorageManager.getUser();


        return (
            <Router>

                {user && <React.Fragment>
                    <Header user={this.state.user} />
                    <Navbar />
                </React.Fragment>}



                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" component={SignUp} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/alljobs" component={AllJobs} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/postjob" component={PostJob} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/editjob" component={EditJob} />

                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}

export default connect(mapStateToProps, null)(Routes)

