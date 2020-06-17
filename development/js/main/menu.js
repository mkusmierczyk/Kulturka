import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter , HashRouter as Router, Link, Route} from "react-router-dom";

export const Menu = () => {
    const [showMenu, setShowMenu] = useState("none");
    const [resize, setResize] = useState("none");

    let resizeWidth = () => {
        if (window.innerWidth > 563) {
            setShowMenu("flex")
        }
    }
    useEffect(() => {
        resizeWidth()
        window.addEventListener("resize", resizeWidth)
    }, []);

    const handleShowMenu = (e) => {
        e.preventDefault();
        setShowMenu("flex");

    };
    const handleHideMenu = (e) => {
        e.preventDefault();
        setShowMenu("none");
    };
    return (
        <>
            <Router>
                <nav className="nav " style={{display: showMenu}}>
                    <div className="nav__menu  ">
                        <h1 className="nav__menu__logo"><Link to={"/"}> Kulturka </Link></h1>
                        <p className="nav__menu__closed" onClick={handleHideMenu}>X</p>
                        <ul className="nav__menu__links">
                            <li className="nav__menu__links nav__menu--link"><Link to={"/"}> <i
                                className="fas fa-th-large"> </i> <span>Panel Główny </span></Link></li>
                            <li className="nav__menu__links nav__menu--link"><Link to={"/search"}><i
                                className="fas fa-search"> </i> <span>Wyszukaj </span> </Link></li>
                            <li className="nav__menu__links nav__menu--link"><Link to={"/myShelf"}><i
                                className="fas fa-book-open"> </i> <span>Moja Półka </span></Link></li>
                            <li className="nav__menu__links nav__menu--link"><Link to={"/myMovies"}><i
                                className="fas fa-video"> </i><span>Moja Filomoteka </span></Link></li>
                            <li className="nav__menu__links nav__menu--link"><Link to={"/wishesList"}><i
                                className="far fa-grin-hearts"> </i> <span>Lista Życzeń</span> </Link></li>
                        </ul>
                    </div>
                    <div className="nav__menu__media">
                        <a href='#'> <i className="fab fa-facebook-square"> </i></a>
                        <a href='#'> <i className="fab fa-twitter-square"> </i></a>
                        <a href='#'> <i className="fab fa-instagram"> </i></a>
                    </div>
                </nav>
                <i className=" nav__menu__hamburger fas fa-bars" onClick={handleShowMenu}> </i>
            </Router>
        </>
    )
};
