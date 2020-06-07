import React, {Component,useEffect} from "react";
import useInput from "./useInput";


export const BookSearch = ({searchName, setSearchName, setMovies, setNoResults, movies})=> {




    useEffect(() => {
        if(option==="Książka"){
            try {
                if (searchName !== "")
                    fetch(`https://wolnelektury.pl/api/books/studnia-i-wahadlo/`)
                        .then(response => {

                            if (response.ok) {
                                return console.log(response.json())
                            } else {
                                throw new Error("Error during loading data")

                            }
                        })
                        .then(data => {
                            setMovies(data.results)

                            console.log(data.results)
                        })
                        .catch(err => console.log(err)
                        );
            } catch (error) {
                console.log(error);
            }
        }

    }, [searchName]);

    useEffect(() => {
        try {
            if (searchName !== "")
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=pl-PL&page=1&include_adult=false&query=${searchName}`)
                    .then(response => {

                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error("Error during loading data")

                        }
                    })
                    .then(data => {
                        setMovies(data.results)

                        console.log(data.results)
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
