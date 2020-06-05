import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import useInput from "./useInput"
import {Menu} from "../main/menu";

export const Search = () => {

    const [searchName, setSearchName] = useInput("")
    const [option, setOption] = useInput("Film");
    const [movies, setMovies] = useState([])
    const [noResults, setNoResults] = useState(1)


    const API_URL = 'http://localhost:3000';

    const [bookMovie, setBookMovie] = useState({
        login: "",
        password: "",
        title: "",
        description: "",
        url: "",
        type: "",
        date: "",
        popularity: "",
        vote_average: "",
        vote_count: "",
        wishlist: ""

    })


    const handleSubmit = (index, e, isWishList) => {
        e.preventDefault();
        e.target.parentElement.style.display = "none"
        const adInfo = document.createElement("span")
        adInfo.innerText = "Dodano do Listy"
        adInfo.style.color = "green"
        adInfo.style.margin = "5px"
        adInfo.style.fontWeight = "bold"

        e.target.parentElement.parentElement.appendChild(adInfo)

        let movie = movies[index]

        setBookMovie({
                login: "",
                password: "",
                title: movie.title,
                description: movie.overview,
                url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                type: option,
                date: new Date,
                popularity: movie.popularity,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                wishlist: isWishList
            }
        )
    }


//Movies API
    const key = "3e8cf997cb85c12acbe8ae2e6af56e4f"


    useEffect(() => {
            const dataToSend = {
                login: bookMovie.login,
                password: bookMovie.password,
                title: bookMovie.title,
                description: bookMovie.description,
                url: bookMovie.url,
                type: bookMovie.type,
                date: bookMovie.date,
                wishlist: bookMovie.wishlist,
                people: {
                    popularity: bookMovie.popularity,
                    vote_average: bookMovie.vote_average,
                    vote_count: bookMovie.vote_count,
                }
            }
            if (bookMovie.title !== "")
                fetch(`${API_URL}/books_movies`, {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                    .then(resp => resp.json())
                    .then(books_movies => {


                    }).catch(err => console.log(err))

        },
        [bookMovie])


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
        <>

            <div className="container search">
                <Menu/>
            <div className="search--all">
                <div className="header">
                    <h1 className="header__title"> Wyszukaj</h1>
                    <div className="row header">
                        <input className="col-11 header__label__input " placeholder="Czego poszukujesz?"
                               type="text" {...setSearchName}/>

                        <select className="header__label__input" value={option}  {...setOption}>
                            <option value="Film">Film</option>
                            <option value="Książka">Książka</option>
                        </select>
                    </div>
                </div>
                <ul className="search__list ">
                    {movies.map((movie, index) => <li className="row search__list__li" key={movie.id}>
                        <img className="search__list__poster col-4 alt"
                             src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                             alt={`plakat filmu ${movie.title}`}/>


                        <div className='col-8 search__list__text'>
                            <h1 className="search__list__text__title col-12 ">{movie.title}</h1>


                            <p className="search__list__text__description col-11">{movie.overview}</p>

                            <div className="  search__list__stats__people col-12">
                                <div
                                    className="search__list__people__popularity"> Obejrzano: <span> {movie.popularity} </span>
                                </div>
                                <div className="search__list__people__avarage">Średnia
                                    Głosów<span> {movie.vote_average}</span></div>
                                <div className="search__list__people__votes">Ilość
                                    Głosów <span>{movie.vote_count}</span></div>
                            </div>

                            <div className=" search__list__buttons  col-12">
                                <button className="search__list__buttons__add btn  "
                                        onClick={e => handleSubmit(index, e, false)}>Dodaj
                                </button>
                                <button className="search__list__buttons__wishList btn "
                                        onClick={e => handleSubmit(index, e, true,)}>Dodaj Lista Życzeń
                                </button>


                            </div>
                        </div>
                    </li>)}
                    {noResults === 0 && <h2> Brak wyników wyszukiwania</h2>}

                </ul>
            </div>
            </div>
        </>
    )
}