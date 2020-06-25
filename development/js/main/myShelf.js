import React, {Component} from "react";
import {Storage} from "./Storage";

export const MyShelf = () => {
    return (
        <>
            <Storage
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