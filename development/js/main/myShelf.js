import React, {Component} from "react";
import {MyMovies} from "./myMovies";

export const MyShelf = () => {
    return (
        <>
            <MyMovies
                wishlist={false}
                type="Książka"
                pageName="Moja Półka"
                movieDate="Wyszukaj Przeczytane od"
                popularityAuthor="Autor: "
                voteAveragePages ="Ilość Stron: "
                voteCountLanguage="Język: "
            />
        </>
    )
};