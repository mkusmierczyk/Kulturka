import React, { useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Menu} from "./menu";
import Logo from "../../images/logo.png"
import SearchBook from "../../images/search_book.jpg"
import SearchMovies from "../../images/search_movie.jpg"
import MyShelf from "../../images/my_shelf_view.jpg"
import MyMovies from "../../images/my_movies.jpg"
import WishList from "../../images/wish_list.jpg"
import {SignOut} from "../auth/signOut";
import * as firebase from 'firebase/app';
import {AuthContext} from "../auth/auth";


export const MainView = () => {
    const [addedMovies, setAddedMovies] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const images = {
        booksSearch: {backgroundImage: `url(${SearchBook})`
        },
        moviesSearch: {backgroundImage: `url(${SearchMovies})`
        },
        shelf: {backgroundImage: `url(${MyShelf})`
        },
        movie: {backgroundImage: `url(${MyMovies})`
        },
        wish: {backgroundImage: `url(${WishList})`
        },
    };
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection("books_movies").get()
            setAddedMovies(data.docs.map(doc => doc.data()))
        }
        fetchData()
    }, [])

    if (!addedMovies) return <h1>Loading data ...</h1>
    const added = addedMovies.map(thi => {
        return thi.dataBase
    })
    let onlyMovies = added.filter(movie => movie.login === currentUser.email && movie.type === "Film" && movie.wishlist === false);
    let onlyBooks = added.filter(movie => movie.login === currentUser.email && movie.type === "Książka" && movie.wishlist === false);
    let now = new Date;
    let onlyMoviesMonth = added.filter(movie => {
        return movie.login === currentUser.email && movie.type === "Film" && movie.wishlist === false && (Date.parse(movie.date) > (Date.parse(now)) - 30 * 1440 * 60 * 1000);
    });
    let onlyBooksMonth = added.filter(movie =>  movie.login === currentUser.email &&movie.type === "Książka" && movie.wishlist === false && (Date.parse(movie.date) > (Date.parse(now)) - 30 * 1440 * 60 * 1000));

    return (
        <>
            <div className='container MenuMain'>
                <Menu/>
                <div className="main">
                    <SignOut/>
                    <div className='row main__hamburger'>
                        <h1 className=" col-12 nav__menu__logo"><Link to={"/"}><img src={Logo}/>Kulturka
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
                        <Link className="col-6 main__searchPage__books" to={"/search"} style={images.booksSearch}>
                            Wyszukaj Książkę
                        </Link>
                        <Link className="col-6 main__searchPage__movies" to={"/search"} style={images.moviesSearch}>
                            Wyszukaj Film
                        </Link>
                    </div>
                    <div className='row main__shortcut'>
                        <Link className="col-4  main__shortcut__myShelf" to={"/myShelf"} style={images.shelf}>
                            Półka
                        </Link>
                        <Link className="col-4  main__shortcut__myMovies" to={"/myMovies"} style={images.movie}>
                            Filomoteka
                        </Link>
                        <Link className="col-4  main__shortcut__wishesList" to={"/wishesList"} style={images.wish}>
                            Lista Życzeń
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};