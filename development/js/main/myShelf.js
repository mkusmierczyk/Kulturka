import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import {MyMovies} from "./myMovies";


export const MyShelf = () => {
    return (
        <>
            <MyMovies wishlist={false} type="Książka" pageName="Moja Półka" movieDate={"Wyszukaj Przeczytane od"}/>
        </>
    )
}