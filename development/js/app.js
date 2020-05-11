import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import '../sass/main.scss'
import {Menu} from "./main/menu";
import {MainView} from "./main/mainView";


const App = () => {
    return (
        <HashRouter>

            <Route exact path="/" component={Menu}/>

            <Route exact path="/" component={MainView}/>


        </HashRouter>

    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
