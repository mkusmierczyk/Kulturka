import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";


export const Menu = () => {
    return (
        <>
            <HashRouter>
            <nav className="nav">
            <div className="nav__menu">
                <h1 className="nav__menu__logo"> Kulturka</h1>
                <ul className="nav__menu__links">
                    <li  className="nav__menu__links nav__menu--link"><Link to={"/"}> <i className="fas fa-th-large"> </i> <span >Panel Główny </span></Link></li>
                    <li  className="nav__menu__links nav__menu--link"><Link to={"/"}><i className="fas fa-search"> </i> <span>Wyszukaj </span> </Link></li>
                    <li  className="nav__menu__links nav__menu--link"><Link to={"/"}><i className="fas fa-book-open"> </i> <span>Moja Półka </span></Link></li>
                    <li className="nav__menu__links nav__menu--link"><Link to={"/"}><i className="fas fa-video"> </i><span>Moja Filomoteka </span></Link></li>
                    <li  className="nav__menu__links nav__menu--link"><Link to={"/"}><i className="far fa-grin-hearts"> </i> <span>Lista Życzeń</span> </Link></li>
                </ul>

            </div>
            <div className="nav__menu__media">
                <a href = '#'> <i className="fab fa-facebook-square">  </i></a>
                <a href = '#'>  <i className="fab fa-twitter-square">  </i></a>
                    <a href = '#'>  <i className="fab fa-instagram">   </i></a>
            </div>
            </nav>
                </HashRouter>
        </>


    )
}
