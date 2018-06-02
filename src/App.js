import React, { Component } from 'react';
import './App.css';
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Logout from "./Logout";
import Menu from "./Menu";
import { getToken } from "./helpers";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import {
    Grid,
    Row,
    Col
} from "react-bootstrap";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { access_token: getToken() };
        this.displayLogin = this.displayLogin.bind(this);
    }

    displayLogin() {
        if (!this.state.access_token) {
            return ( 
            <div>
                <li> <Link to="/signin"> <span className="glyphicon glyphicon-log-in"> Login </span></Link > </li>
                <li> <Link to="/signup"> <span> Signup </span></Link > </li>
            </div>
            );
        } else {
            return ( 
            <div >
                <li> <Link to="/profile"><span className="glyphicon glyphicon-user"> Profile </span></Link ></li>
                <li> <Link to="/signout"> < span className="glyphicon glyphicon-log-out" > Logout </span></Link > </li>
            </div>
            );
        }
    }
    render() {
        return ( 
            <Router>
                <div className="App" >
                    <header className="jumbotron" >
                        <h1 > Hot Corner Delicacies </h1>
                    </header>
                    <Grid >
                        <Row className="show-grid" >
                            <nav className="navbar navbar-inverse" >
                                <div className="container-fluid" >
                                    <div className="navbar-header" >
                                        <Link className="navbar-brand" to="/" > Hot Corner Delicacies </Link> 
                                    </div>
                                <ul className="nav navbar-nav" >
                                    <li className="active" > < Link to="/" > Home </Link></li >
                                    <li> < Link to="/menu" > Menu </Link></li >
                                    <li> < Link to="/orders" > Orders </Link></li >
                                    <li> < Link to="/admin" > Admin </Link></li >
                                </ul>
                                <ul className="nav navbar-nav navbar-right" >
                                    <this.displayLogin />
                                </ul>
                                </div>
                            </nav>
                        </Row>
                        <Row className="show-grid"> 
                            <Home/>
                        </Row>
                        { !this.state.access_token ? (
                            <Row className="show-grid">
                                <Col md={6}>
                                    <Signup />
                                </Col>
                                <Col md={6}>
                                    <Signin />
                                </Col>
                            </Row>
                        ):(
                            <Row className="show-grid">
                              <Menu/>
                            </Row>
                            )}
                        </Grid>
                        <Switch >
                            <Route path="/" exact={ true } component={ App } />
                            <Route path="/signup" component={ Signup } />
                            <Route path="/signin" component={ Signin } />
                            <Route path="/signout" component={ Logout} />
                            <Route path="/Menu" component={ Menu } />
                        </Switch>
                </div>
            </Router>
        );
    }
}

export default App;