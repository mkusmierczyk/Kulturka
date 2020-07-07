import React, { useCallback, useState} from "react";
import app from "../settings/firebaseConfig";
import LoginBackground from "../../images/login_background.jpg";
import {Link} from "react-router-dom";

const Reminder = ({history}) => {
    const [reminderError, setReminderError]= useState(false);
    const [email, setEmail] = useState("");
    const style = {backgroundImage: `url(${LoginBackground})`};

    const handleRemindPass = useCallback(async event => {
        event.preventDefault();
        try{
        await app
            .auth()
            .sendPasswordResetEmail(email)
            alert("Na podanego maila została wysłana wiadomość ")
            } catch(error) {
                setReminderError(error)
               alert("Brak adresu w bazie")
            }
        history.push("/")
    }, [history, email]);

    return (
        <div className="login" style={style}>
            <div className="login__box container">
                <h1 className="row login__box__title">Przypomnij hasło</h1>
                <form className=" login__box__form" onSubmit={handleRemindPass}>
                    <label className="col-9 login__box__form__label">
                        Podaj adres E-mail
                        <input className="header__label__input login__box__form__input" name="email" type="email"
                               placeholder="E-mail" onChange={(event)=> {setEmail(event.target.value) }}/>
                    </label>
                    <button className="col-4 header__label__input login__box__form__submit" type="submit">Przypomnij hasło
                    </button>
                    {reminderError !== false &&  <p className="alert">Brak adresu w bazie</p>}
                </form>
                <Link className="login__box__link" to="/login"> Zaloguj</Link>
            </div>
        </div>
    );
}
export default Reminder