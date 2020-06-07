import React, {Component} from "react";
import {MyMovies} from "./myMovies";

export const WishesList = () => {
    console.log("wishes")
    return (
        <>
            <MyMovies wishlist={true}
                      type={"Film"&&"Książka"}
                      pageName="Lista Życzeń"
                      movieDate={"Wyszukaj od"}/>
        </>
    )
}