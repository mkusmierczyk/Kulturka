import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";
import Background from '../../images/Movies_screen1.png';

export const MainView = () => {
    return (
        <>
            <div className='container main'>
                <div className='row main__hamburger'>
                    <h1 className=" col-12 nav__menu__logo"><Link to={"/"}>Kulturka </Link></h1>
                </div>

                <div className='row main__stats'>
                    <div className="col-6 main__stats__books">
                        <i className="fas fa-book-reader"> </i>
                        <p>Przeczytane:
                            <span className='main__stats__books--counter'>ilość </span>
                        </p>
                        <p>Przeczytane
                            <span className='main__stats__books--month'>"miesiąc"</span>:
                            <span className='main__stats__books--counter--month'>ilość </span>
                        </p>
                    </div>

                    <div className="col-6 main__stats__movies main__stats--all ">
                        <i className="fas fa-film"> </i>
                        <p>Obejrzane Filmy:
                            <span className='main__stats__movies--counter'>ilość </span>
                        </p>
                        <p>Obejrzane Filmy
                            <span className='main__stats__movies--month'>"miesiąc"</span>:
                            <span className='main__stats__movies--counter--month'>ilość </span>
                        </p>
                    </div>

                </div>

                <div className='row main__searchPage '>
                    <Link className="col-6 main__searchPage__books" to={"/search"}>
                        Wyszukaj Książkę
                        {/*// style={{ backgroundImage: `url(${Background})` }}*/}
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

        </>
    )
}