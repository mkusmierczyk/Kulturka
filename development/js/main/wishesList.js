import React, {Component} from "react";
import {MyMovies} from "./myMovies";

export const WishesList = () => {
    return (
        <>
            <MyMovies wishlist={true}
                      type1 = {"Książka"}
                      type2 = {"Film"}
                      pageName="Lista Życzeń"
                      movieDate={"Wyszukaj od"}/>
        </>
    )
};