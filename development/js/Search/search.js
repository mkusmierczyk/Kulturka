import React, {Component, useEffect, useState} from "react";
import useInput from "./useInput"
import {Menu} from "../main/menu";
import {MovieSearch} from "./movieSearch";
import {BookSearch} from "./bookSearch";
import NoImage from "../../images/ar-camera.svg"
import Logo from "../../images/logo.png";

export const Search = () => {
    //Wymaga poprawy usuwanie buttona i dodawanie nowego elementu, przeniesienie  buttonów do innego komponentu, zmienić nazwę zmiennej
    const [searchName, setSearchName] = useInput("")
    const [option, setOption] = useInput("Książka");
    const [movies, setMovies] = useState([]);
    const [noResults, setNoResults] = useState(1);
    const [bookMovie, setBookMovie] = useState({
        login: "",
        password: "",
        title: "",
        author: "",
        pages: "",
        language: "",
        duration: "",
        description: "",
        url: "",
        type: "",
        date: "",
        popularity: "",
        vote_average: "",
        vote_count: "",
        wishlist: ""
    });
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
                author: "",
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
    const API_URL = 'http://localhost:3000';
    useEffect(() => {

            if (bookMovie.title !== "")
                fetch(`${API_URL}/books_movies`, {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookMovie)
                })
                    .then(resp => resp.json())
                    .catch(err => console.log(err))
        },
        [bookMovie]);


    return (
        <>
            <div className="container search">
                <Menu/>
                <div className="search--all">
                    <div className="header">
                        <h1 className="header__title"> Wyszukaj</h1>
                        <div className="row header">
                            {option === "Film" ?
                                <MovieSearch searchName={searchName}
                                             setSearchName={setSearchName}
                                             movies={movies}
                                             setMovies={setMovies}
                                             setNoResults={setNoResults}/> :
                                <BookSearch searchName={searchName}
                                            setSearchName={setSearchName}
                                            movies={movies}
                                            setMovies={setMovies}
                                            setNoResults={setNoResults}/>}
                            <select className="header__label__input"
                                    value={option}  {...setOption}>
                                <option
                                    value="Film">Film
                                </option>
                                <option
                                    value="Książka">Książka
                                </option>
                            </select>
                        </div>
                    </div>
                    <ul className="search__list ">

                        {option === "Film" ?
                            movies.map((movie, index) => <li className="row search__list__li" key={movie.id}>
                                <img className="search__list__poster col-4 alt"
                                     src={`https://image.tmdb.org/t/p/w500/null` ?
                                         `https://image.flaticon.com/icons/svg/2965/2965705.svg` :
                                         `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
                            </li>) :

                            movies.map((movie, index) => <li className="row search__list__li" key={movie.id}>
                                <img className="search__list__poster col-4 alt"
                                     src={movie.volumeInfo.imageLinks === undefined
                                         ? `https://image.flaticon.com/icons/svg/2965/2965705.svg`
                                         : `${movie.volumeInfo.imageLinks.thumbnail}`
                                     }
                                     alt={`Okładka ksiązki ${movie.volumeInfo.title}`}/>
                                <div className='col-8 search__list__text'>
                                    <h1 className="search__list__text__title col-12 ">{movie.volumeInfo.title}</h1>
                                    <p className="search__list__text__description col-11">{movie.volumeInfo.description}</p>
                                    <div className="  search__list__stats__people col-12">
                                        <div
                                            className="search__list__people__popularity"> Liczba
                                            stron: <span> {movie.volumeInfo.pageCount} </span>
                                        </div>
                                        <div
                                            className="search__list__people__avarage">Język <span> {movie.volumeInfo.language}</span>
                                        </div>
                                        <div
                                            className="search__list__people__votes"> Autorzy <span>{movie.volumeInfo.authors}</span>
                                        </div>
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
                            </li>)
                        }

                        {noResults === 0 && <h2> Brak wyników wyszukiwania</h2>}
                    </ul>
                </div>
            </div>
        </>
    )
};


