import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import useInput from "./useInput"

export const Search = () => {
    const [searchName, setSearchName] = useInput("Władca Pierścieni")
    const [movies, setMovies] = useState([])


    const API = "https://api.themoviedb.org/3/movie/550?api_key=";
    const key = "3e8cf997cb85c12acbe8ae2e6af56e4f"




    useEffect(() => {
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


    }, []);

    console.log(movies);

    return (
        <>
            <input type="text" {...setSearchName}/>

            <ul className="movie_list">
                {movies.map(movie => <li key={movie.id}>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />

                    <div>Średnia Głosów {movie.vote_average}</div>
                    <div>Ilość Głosów {movie.vote_count}</div>

                </li>)}
            </ul>


        </>
    )
}