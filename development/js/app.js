import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import '../sass/main.scss'
import {Menu} from "./main/menu";
import {MainView} from "./main/mainView";
import {Search} from "./Search/search";
import {MyShelf} from "./main/myShelf";
import {MyMovies} from "./main/myMovies";
import {WishesList} from "./main/wishesList";


const App = () => {
    return (
        <HashRouter>

            <Route exact path="/menu" component={Menu}/>
            <Route exact path="/" component={MainView} allMovies ="data" />
            <Route exact path="/search" component={Search}/>
            <Route exact path="/myShelf" component={MyShelf}/>
            <Route exact path="/myMovies" component={MyMovies} />
            <Route exact path="/wishesList" component={WishesList}/>


        </HashRouter>

    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
