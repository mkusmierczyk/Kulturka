import React, { useCallback, useContext } from "react";
import {withRouter, Redirect, Link} from "react-router-dom";
import app from "../settings/firebaseConfig";
import {AuthContext}  from "./auth";
import LoginBackground from "../../images/login_background.jpg"


const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );
    const style = {backgroundImage:`url(${LoginBackground})`}

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login" style={style}>
        <div className="login__box container">
            <h1 className="row login__box__title">Zaloguj</h1>
            <form className=" login__box__form" onSubmit={handleLogin}>
                <label className="col-9 login__box__form__label">
                    Email
                    <input className="header__label__input login__box__form__input" name="email" type="email" placeholder="Email" />
                </label>
                <label className="col-9 login__box__form__label">
                    Hasło
                    <input className="header__label__input login__box__form__input" name="password" type="password" placeholder="Password" />
                </label>
                <button className="col-4 header__label__input login__box__form__submit" type="submit">Zaloguj</button>
            </form>
            <Link className="login__box__link" to="/register"> Zarejestruj</Link>
            <Link className="login__box__link" to="/"> Zapomniałem Hasła</Link>
        </div>
        </div>
    );
};

export default withRouter(Login);