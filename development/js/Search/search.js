import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import useInput from "./useInput"

export const Search = () => {
    const [searchName, setSearchName] = useInput("Władca Pierścieni")
    const [movies, setMovies] = useState([])

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
            .catch(err => console.log(err));

    }, [searchName.length > 15]);

    console.log(searchName.length)

    console.log(movies);


    if (movies === []) return <p>Loading data...</p>;

    return (
        <>
            <div className="container search">
                <div className="row search__inputs">
                    <input className="col-12" type="text" {...setSearchName}/>
                </div>


                <ul className="search_list ">
                    {movies.map(movie => <li className="row" key={movie.id}>
                        <img className="search__list__poster col-4"
                             src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>


                        <div className='col-8 search__list__text'>
                            <h1 className="search__list__text__title col-12 ">{movie.title}</h1>


                            <p className="search__list__text__description col-12">{movie.overview}</p>

                            <div className="  search__list__stats__people col-12">
                                <div className="search__list__people__popularity"> Obejrzano: {movie.popularity}</div>
                                <div className="search__list__people__avarage">Średnia Głosów {movie.vote_average}</div>
                                <div className="search__list__people__votes">Ilość Głosów {movie.vote_count}</div>
                            </div>

                        <div className=" search__list__buttons col-12">
                            <button className="search__list__buttons__add  ">Dodaj</button>
                            <button className="search__list__buttons__wishList ">Lista Życzeń</button>
                        </div>
                        </div>
                    </li>)}
                </ul>
            </div>
        </>
    )
}