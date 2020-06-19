import React, {Component} from "react";
import {MyMovies} from "./myMovies";

export const WishesList = () => {
    return (
        <>
            <MyMovies wishlist={true}
                      typeBottom={4}
                      typeTop={4}
                      pageName="Lista Życzeń"
                      movieDate={"Wyszukaj od"}/>
        </>
    )
};