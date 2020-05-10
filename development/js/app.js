import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import '../sass/main.scss'


const App = () => {
    return (
        <HashRouter>
            <>
                <div> Kulturka</div>
            </>
        </HashRouter>

    )
}

ReactDOM.render(<App/>, document.getElementById("app"));
