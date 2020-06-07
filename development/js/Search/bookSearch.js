import React, {Component,useEffect} from "react";
import useInput from "./useInput";


export const BookSearch = ({searchName, setSearchName, setMovies, setNoResults, movies})=> {

    useEffect(() => {
            try {
                if (searchName !== "")
                    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchName}`)
                        .then(response => {

                            if (response.ok) {
                                return (response.json())
                            } else {
                                throw new Error("Error during loading data")

                            }
                        })
                        .then(data => {
                            console.log(data.items);
                            setMovies(data.items);
                        })
                        .catch(err => console.log(err)
                        );
            } catch (error) {
                console.log(error);
            }
        setNoResults(movies.length)
    }, [searchName]);

    if (movies === []) return <p>Loading data...</p>;

    return (
        <input className="col-11 header__label__input " placeholder="Czego poszukujesz?"
               type="text" {...setSearchName}/>
    )
}
