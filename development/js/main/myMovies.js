import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import {Menu} from "./menu";
import useInput from "../Search/useInput";


export const MyMovies = (props) => {

    const [addedMovies, setAddedMovies] = useState(false)
    const [filterStart, setFilterStart] = useInput("2019-03-13")
    const [filterEnd, setFilterEnd] = useInput("2020-05-14")


    const API_URL = 'http://localhost:3000';

    useEffect(() => {
        fetch(`${API_URL}/books_movies`)
            .then(response => {

                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Error during loading data")
                }
            })

            .then(data => {

                setAddedMovies({data})
                console.log(data)

            })
            .catch(error => {
                console.log(error)
            })

    }, [])


    const handleDeleteClick = (e, movieId) => {
        e.preventDefault();
        fetch(`${API_URL}/books_movies/${movieId}`, {
            method: 'DELETE'
        })
            .then(d => {
                console.log("usnięto", d)
                const data = addedMovies.data.filter(movie => movie.id !== movieId);
                setAddedMovies({data})
                console.log(addedMovies);
            })
            .catch(err => {
                console.log(err)
            })
    }


    if (!addedMovies) return <h1>Loading data ...</h1>


    let type = props.type || "Film";
    let wishesList = props.wishlist || false
    let pageName = props.pageName || "Moja Filmoteka"
    let movieDate = props.movieDate || "Wyszukaj Filmy obejrzane od:"
    let allMovies = props.AllMovies;


    let now = new Date

    const onlyMoviesNonWS = addedMovies.data.filter(movie => {
        return movie.type === type &&
            movie.wishlist === wishesList &&
            (Date.parse(movie.date) > (Date.parse(filterStart + "T00:00:00"))
                && Date.parse(movie.date) < (Date.parse(filterEnd + "T23:59:59")))

    })


    return (
        <>
            <Menu/>
            <div className="container">
                <div className="header">
                    <h1 className="header__title">{pageName} </h1>
                    <div className="header">
                        <label className="header__label"> {movieDate}
                            <input className=" col-12 header__label__input col-12" type="date" required
                                   pattern="\d{4}-\d{2}-\d{2}" {...setFilterStart}/>
                        </label>
                        <label className="header__label"> do:
                            <input className="col-12 header__label__input" type="date" {...setFilterEnd}/>
                        </label>
                    </div>
                </div>

                <ul className="search__list ">
                    {onlyMoviesNonWS.map((movie, index) => <li className="row" key={index}>
                        <img className="search__list__poster col-4 alt"
                             src={movie.url}
                             alt={`plakat filmu ${movie.title}`}/>


                        <div className='col-8 search__list__text'>
                            <h1 className="search__list__text__title col-12 ">{movie.title}</h1>


                            <p className="search__list__text__description col-11">{movie.description}</p>

                            <div className="  search__list__stats__people col-12">
                                <div
                                    className="search__list__people__popularity"> Obejrzano: {movie.people.popularity}</div>
                                <div className="search__list__people__avarage">Średnia:
                                    Głosów {movie.people.vote_average}</div>
                                <div className="search__list__people__votes">Ilość:
                                    Głosów {movie.people.vote_count}</div>
                                <div className="search__list__people__date">Data
                                    Dodania: {movie.date.substr(0, 10)}</div>
                            </div>

                            <div className=" search__list__buttons col-12">
                                <button className="search__list__buttons__add btn  "
                                        onClick={e => handleDeleteClick(e, movie.id)}>Usuń
                                </button>

                            </div>
                        </div>
                    </li>)}
                </ul>

            </div>
        </>
    )
}