import React, {useState} from "react";
import {Storage} from "./Storage";

export const WishesList = () => {
    const [option, setOption] = useState("Książka");
    const handleOnChange = e => {
        setOption(e.target.value)
    };
    return (
        <>
            <div className="option">
            <select className="header__label__input option__input"
                    value={option}  onChange={handleOnChange}>
                <option
                    value="Film">Film
                </option>
                <option
                    value="Książka">Książka
                </option>
            </select>
            </div>
            {option === "Książka"?
                <Storage wishlist={true}
                          type = "Książka"
                          pageName="Lista Życzeń"
                          movieDate="Wyszukaj od"
                         popularityAuthor="Autor:"
                         voteAveragePages ="Ilość Stron:"
                         voteCountLanguage="Język:"/>
                          :
                <Storage wishlist={true}
                          type = {"Film"}
                          pageName="Lista Życzeń"
                          movieDate={"Wyszukaj od"}/>
            }
        </>
    )
};