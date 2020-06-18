import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter as Router, Link, Route, Switch} from "react-router-dom";
import '../sass/main.scss'
import {Menu} from "./main/menu";
import {MainView} from "./main/mainView";
import {Search} from "./Search/search";
import {MyShelf} from "./main/myShelf";
import {MyMovies} from "./main/myMovies";
import {WishesList} from "./main/wishesList";
import Login from "./auth/login";
import {Auth} from "./auth/auth";
import Register from "./auth/register";
import "@babel/polyfill";
import PrivateRoute from "./auth/privateRoute";

const App = () => {
    return (
        <Auth>
            <Router>
                <Route exact path="/menu" component={Menu}/>
                <PrivateRoute exact path="/" component={MainView}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/myShelf" component={MyShelf}/>
                <Route exact path="/myMovies" component={MyMovies}/>
                <Route exact path="/wishesList" component={WishesList}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </Router>
        </Auth>
    )
}
ReactDOM.render(<App/>, document.getElementById("app"));
