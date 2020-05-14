import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import {MyMovies} from "./myMovies";
import {Menu} from "./menu";


export const WishesList = () => {


    console.log("wishes")
    return (
        <>
            <MyMovies wishlist={true} type="Film" pageName="Lista Życzeń" movieDate={"Wyszukaj od"}/>
            {/*<MyMovies wishlist ={true} type = "Książka"  />*/}
        </>
    )
}