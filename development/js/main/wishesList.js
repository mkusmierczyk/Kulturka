import React, {Component} from "react";
import {MyMovies} from "./myMovies";

export const WishesList = () => {
    return (
        <>
            <MyMovies wishlist={true}
                      type={"Książka" || "Film"}
                      pageName="Lista Życzeń"
                      movieDate={"Wyszukaj od"}/>
        </>
    )
};