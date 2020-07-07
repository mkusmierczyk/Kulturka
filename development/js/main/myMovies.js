import React, {useState} from "react";
import {Storage} from "./Storage";

export const MyMovies = () => {

    return (
        <>
                <Storage wishlist={false}
                         type = {"Film"}
                         pageName="Lista Życzeń"
                         movieDate={"Wyszukaj od"}/>
            }
        </>
    )
};