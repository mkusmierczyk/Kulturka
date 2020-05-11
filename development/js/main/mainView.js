import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, HashRouter, Link, Route} from "react-router-dom";

export const MainView = () => {
    return (
        <>
            <div className='container main'>
                <div className='row main__stats'>
                    <div className="col-6 main__stats__books">
                        <p>Przeczytane {"ilość"}</p>
                        <p>Przeczytane {"miesiąc"}: {"ilość"}</p>
                    </div>
                    <div className="col-6 main__stats__movies">
                        <p>Obejrzane Filmy {"ilość"}</p>
                        <p>Obejrzane Filmy {"miesiąc"}: {"ilość"}</p>
                    </div>

                </div>
                <div className='row main__searchPage'>
                    <div className="col-6 main__searchPage__books">
                        <p></p></div>
                    <div className="col-6 main__searchPage__movies">
                        <p></p>
                    </div>
                </div>
                <div className='row main__shortcut'>
                    <div className="col-3 row main__shortcut__myShelf">
                        <p></p>
                    </div>
                    <div className="col-3 row main__shortcut__myMovies">
                        <p></p>
                    </div>
                    <div className="col-3 row main__shortcut__wishesList">
                        <p></p>
                    </div>
                </div>
            </div>

        </>
    )
}