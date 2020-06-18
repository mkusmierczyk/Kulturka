import React, {Component, useEffect, useState} from "react";
import {Menu} from "./menu";
import useInput from "../Search/useInput";
import firebase from "firebase";

export const MyMovies = (props) => {
    const now = new Date();
    const [addedMovies, setAddedMovies] = useState(false);
    const [filterStart, setFilterStart] = useInput("2019-03-13");
    const [filterEnd, setFilterEnd] = useInput((now.toISOString().slice(0, 10)));

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("books_movies").get()
            setAddedMovies(data.docs.map(doc => doc.data()))
        }
        fetchData()
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
            });
    };

    if (!addedMovies) return <h1>Loading data ...</h1>
    let type = props.type || "Film";
    let wishesList = props.wishlist || false;
    let pageName = props.pageName || "Moja Filmoteka";
    let movieDate = props.movieDate || "Wyszukaj Filmy obejrzane od:";
    let popularityAuthor = props.popularityAuthor || "Ilość Obejrzeń";
    let voteAveragePages = props.voteAveragePages || "Średnia Głosów:";
    let voteCountLanguage = props.voteCountLanguage || "Ilość Głosów:";

const added = addedMovies.map(thi => {
    return thi.dataBase
})


    const onlyMoviesNonWS = added.filter(movie => {
        return movie.type === type &&
            movie.wishlist === wishesList &&
            (Date.parse(movie.date) > (Date.parse(filterStart + "T00:00:00"))
                && Date.parse(movie.date) < (Date.parse(filterEnd + "T23:59:59")))
    });
console.log(onlyMoviesNonWS)

    return (
        <>
            <div className="container header--menu">
                <Menu/>
                <div className="headerMenu">
                    <div className="header">
                        <h1 className="header__title">{pageName} </h1>
                        <div className="header--label">
                            <label className="header__label"> {movieDate}
                                <input className=" header__label__input" type="date" required
                                       pattern="\d{4}-\d{2}-\d{2}" {...setFilterStart}/>
                            </label>
                            <label className="header__label"> do:
                                <input className=" header__label__input" type="date" {...setFilterEnd}/>
                            </label>
                        </div>
                    </div>
                    <ul className="search__list ">
                        {onlyMoviesNonWS.map((movie) => <li className="row" key={movie.id}>
                            <img className="search__list__poster col-4 alt"
                                 src={movie.url}
                                 alt={`plakat filmu ${movie.title}`}/>
                            <div className='col-8 search__list__text'>
                                <h1 className="search__list__text__title col-12 ">{movie.title}</h1>
                                <p className="search__list__text__description col-11">{movie.description}</p>
                                <div className="  search__list__stats__people col-12">
                                    <div className="search__list__people__popularity">
                                        {popularityAuthor} {movie.authorPopularity}</div>
                                    <div className="search__list__people__avarage">
                                        {voteAveragePages} {movie.pagesVoteAverage}</div>
                                    <div className="search__list__people__votes">{voteCountLanguage}
                                        {movie.languageVoteCount}</div>
                                    <div className="search__list__people__date">
                                        Data Dodania: {movie.date.slice(0,10)}
                                    </div>
                                </div>
                                <div className=" search__list__buttons col-12">
                                    <button className="search__list__buttons__add btn  "
                                            onClick={e => handleDeleteClick(e, movie.id)}>Usuń
                                    </button>
                                </div>
                            </div>
                        </li>)}
                        {onlyMoviesNonWS.length === 0 && <h2> Brak wyników wyszukiwania</h2>}
                    </ul>
                </div>
            </div>
        </>
    )
};