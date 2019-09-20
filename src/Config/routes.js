import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from '../Components/Login/Login';
import SignUp from '../Components/Login/SignUp'
import { connect } from 'react-redux'
import SessionStorageManager from './SessionStorageManager';
// import { loginUser } from '../Redux/actions/authActions'
import Dashboard from '../Components/Dashboard/Dashboard';
import Article from '../Components/Article/Article';
import ViewArticle from '../Components/ViewArticle/ViewArticle'



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
                    {/* <Header user={this.state.user} /> */}
                    {/* <Navbar /> */}
                </React.Fragment>}



                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={SignUp} />
                    <Route path="/article/:id/:slug" component={ViewArticle} />
                    {/* <Route path="/dashboard" exact component={Dashboard}/> */}
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/article" component={Article} />
                    {/* <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/alljobs" component={AllJobs} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/postjob" component={PostJob} />
                    <PrivateRoute isLoggedIn={(this.props.isLoggedIn || this.state.isLoggedIn)} exact path="/editjob" component={EditJob} /> */}

                </Switch>
            </Router>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("mapToState",state.authReducer)
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
    }
  }

export default connect(mapStateToProps, null)(Routes)

