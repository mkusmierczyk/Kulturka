import React, {Component} from "react";
import {MyMovies} from "./myMovies";

export const MyShelf = () => {
    return (
        <>
            <MyMovies
                wishlist={false}
                type1="Książka"
                type2="Książka"
                pageName="Moja Półka"
                movieDate="Wyszukaj Przeczytane od"
                popularityAuthor="Autor: "
                voteAveragePages ="Ilość Stron: "
                voteCountLanguage="Język: "
            />
        </>
    )
};