import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import {MyMovies} from "./myMovies";
import {Menu} from "./menu";


export const WishesList = () => {



    console.log("wishes")
    return (
        <>
            <Menu/>
            <MyMovies wishlist ={true} type = "Film"  />
            <MyMovies wishlist ={true} type = "Książki"  />
    </>
    )
}