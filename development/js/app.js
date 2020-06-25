import React, {Component} from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route} from "react-router-dom";
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
import Reminder from "./auth/reminder";

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
                <Route exact path="/reminder" component={Reminder}/>
            </Router>
        </Auth>
    )
}
ReactDOM.render(<App/>, document.getElementById("app"));
