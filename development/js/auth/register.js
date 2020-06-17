import React, {useCallback} from "react";
import {Link, withRouter} from "react-router-dom";
import app from "../settings/firebaseConfig";
import LoginBackground from "../../images/login_background.jpg"

const Register = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const style = {backgroundImage: `url(${LoginBackground})`}

    return (
        <div className="login" style={style}>
            <div className="login__box container">
                <h1 className="row login__box__title">Zarejestruj</h1>
                <form className="login__box__form" onSubmit={handleSignUp}>
                    <label className="col-9 login__box__form__label">
                        Email
                        <input className="header__label__input login__box__form__input" name="email" type="email"
                               placeholder="Email"/>
                    </label>

                    <label className="col-9 login__box__form__label">
                        Hasło
                        <input className="header__label__input login__box__form__input" name="password" type="password"
                               placeholder="Hasło"/>
                    </label>
                    <label className="col-9 login__box__form__label">
                        Powtórz Hasło
                        <input className="header__label__input login__box__form__input" name="repeatPassword"
                               type="password" placeholder="Powtórz Hasło"/>
                    </label>
                    <button className="col-4 header__label__input login__box__form__submit" type="submit">Zarejestruj
                    </button>
                </form>
                <Link className="login__box__link" to="/login"> Zaloguj się</Link>
            </div>
        </div>
    );
};

export default withRouter(Register);
