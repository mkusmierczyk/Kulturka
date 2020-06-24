import React, {useContext, useEffect, useState} from "react";
import {Menu} from "./menu";
import useInput from "../Search/useInput";
import firebase from "firebase";
import {AuthContext} from "../auth/auth";


export const MyMovies = (props) => {
    // nie działa wishlist nie widać Ksiązek i filmów razem naprawić filtr  Tylko jedno wejscie danych o jedno wyjście
    const now = new Date();
    const [addedMovies, setAddedMovies] = useState(false);
    const [filterStart, setFilterStart] = useInput("2019-03-13");
    const [filterEnd, setFilterEnd] = useInput((now.toISOString().slice(0, 10)));
    const {currentUser} = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("books_movies").get()
            setAddedMovies(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        fetchData()
    }, [])

    if (!addedMovies) return <h1>Loading data ...</h1>

    let type = props.type || "Film";
    let wishesList = props.wishlist || false;
    let pageName = props.pageName || "Moja Filmoteka";
    let movieDate = props.movieDate || "Wyszukaj Filmy obejrzane od:";
    let popularityAuthor = props.popularityAuthor || "Ilość Obejrzeń";
    let voteAveragePages = props.voteAveragePages || "Średnia Głosów:";
    let voteCountLanguage = props.voteCountLanguage || "Ilość Głosów:";

    const handleDeleteClick = (e, movieId) => {
        e.preventDefault();
        const db = firebase.firestore()
        db.collection("books_movies").doc(movieId).delete()
        const data = addedMovies.filter(movie => movie.id !== movieId);
        setAddedMovies(data)
    };

    const onlyMoviesNonWS = addedMovies.filter(movie => {
        return  movie.dataBase.login === currentUser.email &&
            movie.dataBase.type === type &&
            movie.dataBase.wishlist === wishesList &&
            (Date.parse(movie.dataBase.date) > (Date.parse(filterStart + "T00:00:00"))
                && Date.parse(movie.dataBase.date) < (Date.parse(filterEnd + "T23:59:59")))
    });
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
                        {onlyMoviesNonWS.map((movie) => <li className="row" key={movie.dataBase.id}>
                            <img className="search__list__poster col-4 alt"
                                 src={movie.dataBase.url}
                                 alt={`plakat filmu ${movie.dataBase.title}`}/>
                            <div className='col-8 search__list__text'>
                                <h1 className="search__list__text__title col-12 ">{movie.dataBase.title}</h1>
                                <p className="search__list__text__description col-11">{movie.dataBase.description}</p>
                                <div className="  search__list__stats__people col-12">
                                    <div className="search__list__people__popularity">
                                        {popularityAuthor} {movie.dataBase.authorPopularity}</div>
                                    <div className="search__list__people__avarage">
                                        {voteAveragePages} {movie.dataBase.pagesVoteAverage}</div>
                                    <div className="search__list__people__votes">{voteCountLanguage}
                                        {movie.languageVoteCount}</div>
                                    <div className="search__list__people__date">
                                        Data Dodania: {movie.dataBase.date.slice(0, 10)}
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
