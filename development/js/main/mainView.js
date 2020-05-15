import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import useInput from "../Search/useInput";
import * as Data from "autoprefixer/lib/brackets";
import {Menu} from "./menu";


export const MainView = () => {


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


    if (!addedMovies) return <h1>Loading data ...</h1>

    let onlyMovies = addedMovies.data.filter(movie => movie.type === "Film" && movie.wishlist === false)
    let onlyBooks = addedMovies.data.filter(movie => movie.type === "Książka" && movie.wishlist === false)
    let now = new Date
    let onlyMoviesMonth = addedMovies.data.filter(movie => {
        return movie.type === "Film" && movie.wishlist === false && (Date.parse(movie.date) > (Date.parse(now)) - 30 * 1440 * 60 * 1000)
    })
    let onlyBooksMonth = addedMovies.data.filter(movie => movie.type === "Książka" && movie.wishlist === false && (Date.parse(movie.date) > (Date.parse(now)) - 30 * 1440 * 60 * 1000))
    console.log(onlyBooksMonth)



    return (
        <>

            <div className='container MenuMain'>
                <Menu/>
                <div className="main">
                <div className='row main__hamburger'>
                    <h1 className=" col-12 nav__menu__logo"><Link to={"/"}><img src="../../images/logo.png"/>Kulturka
                    </Link></h1>
                </div>

                <div className='row main__stats'>
                    <div className="col-6 main__stats__books">
                        <i className="fas fa-book-reader"> </i>
                        <p>Przeczytane:
                            <span className='main__stats__books--counter'>{onlyBooks.length} </span>
                        </p>
                        <p>Ostatnie 30 dni:
                            <span className='main__stats__books--counter--month'>{onlyBooksMonth.length} </span>
                        </p>
                    </div>

                    <div className="col-6 main__stats__movies main__stats--all ">
                        <i className="fas fa-film"> </i>
                        <p>Obejrzane Filmy:
                            <span className='main__stats__movies--counter'>{onlyMovies.length} </span>
                        </p>
                        <p>Ostatnie 30 dni:
                            <span className='main__stats__movies--counter--month'>{onlyMoviesMonth.length} </span>
                        </p>
                    </div>

                </div>

                <div className='row main__searchPage '>
                    <Link className="col-6 main__searchPage__books" to={"/search"}>
                        Wyszukaj Książkę
                    </Link>
                    <Link className="col-6 main__searchPage__movies" to={"/search"}>
                        Wyszukaj Film
                    </Link>
                </div>

                <div className='row main__shortcut'>
                    <Link className="col-4 row main__shortcut__myShelf" to={"/myShelf"}>
                        Półka
                    </Link>
                    <Link className="col-4 row main__shortcut__myMovies" to={"/myMovies"}>
                        Filomoteka
                    </Link>
                    <Link className="col-4 row main__shortcut__wishesList" to={"/wishesList"}>
                        Lista Życzeń
                    </Link>
                </div>
                </div>
            </div>

        </>
    )
}