import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import useInput from "./useInput"
import {Menu} from "../main/menu";

export const Search = () => {
    const [searchName, setSearchName] = useInput("Władca Pierścieni")
    const [option, setOption] = useInput("Film");
    const [movies, setMovies] = useState([])
    // const[hideButton, setHideButton] = useState(true)



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


    const handleSubmit = (index, e, isWishList , btn) => {
        e.preventDefault();
        // setHideButton(btn);
        let movie = movies[index]
        console.log(movie);
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

    }, [searchName]);

    console.log(searchName.length)

    console.log(movies);
    console.log(option)


    if (movies === []) return <p>Loading data...</p>;

    return (
        <>
            <Menu> </Menu>
            <div className="container search">
                <div className="row search__inputs">
                    <input className="col-12" type="text" {...setSearchName}/>
                    <select value={option}  {...setOption}>
                        <option value="Film">Film</option>
                        <option value="Książka">Książka</option>
                    </select>
                </div>


                <ul className="search__list ">
                    {movies.map((movie, index) => <li className="row" key={movie.id}>
                        <img className="search__list__poster col-4 alt"
                             src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                             alt={`plakat filmu ${movie.title}`}/>


                        <div className='col-8 search__list__text'>
                            <h1 className="search__list__text__title col-12 ">{movie.title}</h1>


                            <p className="search__list__text__description col-12">{movie.overview}</p>

                            <div className="  search__list__stats__people col-12">
                                <div className="search__list__people__popularity"> Obejrzano: {movie.popularity}</div>
                                <div className="search__list__people__avarage">Średnia Głosów {movie.vote_average}</div>
                                <div className="search__list__people__votes">Ilość Głosów {movie.vote_count}</div>
                            </div>

                            <div className=" search__list__buttons col-12">
                                <button className="search__list__buttons__add  "
                                        onClick={e => handleSubmit(index, e, false)}>Dodaj
                                </button>
                                <button  className="search__list__buttons__wishList "
                                        onClick={e => handleSubmit(index, e, true,false)}>Dodaj Lista Życzeń
                                </button>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </div>
        </>
    )
}