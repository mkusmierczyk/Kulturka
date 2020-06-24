import React from "react";
import {MyMovies} from "./myMovies";

export const WishesList = () => {
    return (
        <>
            <MyMovies wishlist={true}
                      type = {"Książka"}
                      pageName="Lista Życzeń"
                      movieDate={"Wyszukaj od"}/>
        </>
    )
};