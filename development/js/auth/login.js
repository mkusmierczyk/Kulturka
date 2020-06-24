import React, {useCallback, useContext, useState} from "react";
import {withRouter, Redirect, Link} from "react-router-dom";
import app from "../settings/firebaseConfig";
import {AuthContext} from "./auth";
import LoginBackground from "../../images/login_background.jpg"

const Login = ({history}) => {
    const [loginError, setLoginError]= useState(false)
    const [emailVerified, setEmailVerified] =useState(false)
    const style = {backgroundImage: `url(${LoginBackground})`}
    // do poprawy logowanie przez Facbooka i Google i przypomienie hasła.  i tak się loguje bez potiwerdzenia hasła
    const handleLogin = useCallback(

        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);

                if (app.auth().currentUser.emailVerified === true) {
                    history.push("/");
                } else await app.auth().signOut()
                    setEmailVerified(true)
            } catch (error) {
                setLoginError([error]);
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);
    if (currentUser) {
        if (app.auth().currentUser.emailVerified === true) {
            return <Redirect to="/"/>;
        }
    }

    return (
        <div className="login" style={style}>
            <div className="login__box container">
                <h1 className="row login__box__title">Zaloguj</h1>
                <form className=" login__box__form" onSubmit={handleLogin}>
                    <label className="col-9 login__box__form__label">
                        Email
                        <input className="header__label__input login__box__form__input" name="email" type="email"
                               placeholder="Email"/>
                    </label>
                    <label className="col-9 login__box__form__label">
                        Hasło
                        <input className="header__label__input login__box__form__input" name="password" type="password"
                               placeholder="Password"/>
                    </label>
                    <button className="col-4 header__label__input login__box__form__submit" type="submit">Zaloguj
                    </button>
                    {loginError !== false &&  <p className="alert">Niepoprawne login lub hasło</p>}
                    {emailVerified !== false &&  <p className="alert">Proszę potiwerdzić e-mail</p>}
                </form>
                <Link className="login__box__link" to="/register"> Zarejestruj</Link>
                <Link className="login__box__link" to="/reminder"> Zapomniałem Hasła</Link>
            </div>
        </div>
    );
};
export default withRouter(Login);