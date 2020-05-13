import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import {Menu} from "./menu";


export const MyMovies = (props) => {

    const [addedMovies, setAddedMovies] = useState(false)

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

    console.log(addedMovies);


    if (!addedMovies) return <h1>Loading data ...</h1>

    let type = props.type || "Film";
    let wishesList= props.wishlist|| false

    const onlyMoviesNonWS = addedMovies.data.filter((movies) => movies.type === type && movies.wishlist === wishesList)


    return (
        <>
            <Menu/>
            <div className="container">
                <h1>Moja Filomoteka </h1>

                <label> Wyszukaj Filmy od:
                    <input className="col-12" type="text"/>
                </label>
                <label> do:
                    <input className="col-12" type="text"/>
                </label>

                <ul className="search__list ">
                    {onlyMoviesNonWS.map((movie, index) => <li className="row" key={index}>
                        <img className="search__list__poster col-4 alt"
                             src={movie.url}
                             alt={`plakat filmu ${movie.title}`}/>


                        <div className='col-8 search__list__text'>
                            <h1 className="search__list__text__title col-12 ">{movie.title}</h1>


                            <p className="search__list__text__description col-12">{movie.description}</p>

                            <div className="  search__list__stats__people col-12">
                                <div
                                    className="search__list__people__popularity"> Obejrzano: {movie.people.popularity}</div>
                                <div className="search__list__people__avarage">Średnia
                                    Głosów {movie.people.vote_average}</div>
                                <div className="search__list__people__votes">Ilość
                                    Głosów {movie.people.vote_count}</div>
                            </div>

                            <div className=" search__list__buttons col-12">
                                <button className="search__list__buttons__add  "
                                        onClick={e => handleSubmit(index, e, false)}>Usuń
                                </button>

                            </div>
                        </div>
                    </li>)}
                </ul>

            </div>
        </>
    )
}