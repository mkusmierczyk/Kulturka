import React, {useCallback, useContext, useState} from "react"
import {AuthContext} from "../auth/auth";
import app from "../settings/firebaseConfig";
import * as firebase from "firebase";
import {Menu} from "../main/menu";


const Settings = ({history}) => {

    const {currentUser} = useContext(AuthContext);
    const [showModal, setSetShowModal] = useState(false);
    const [password, setPassword] = useState("");

    const onModalClick = () => {
        setSetShowModal(true)
    };
    const onModalExit = () => {
        setSetShowModal(false)
    };

    const onDeleteClick = async () => {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
          password
        );
        currentUser.reauthenticateWithCredential(credential).then(function() {
        }).catch(function(error) {
            // An error happened.
        });
        currentUser.delete().then(function () {
            // User deleted.
            history.push("/")
            console.log("userDelete")
        }).catch(function (error) {
            // An error happened.
            console.log(error)
        });
    }

    return (
        <>
            <div className="settings container">
                <Menu/>
                <div className="settings__deleteUser row">
                    <h1 className="col-12">Usuń Konto </h1>
                    <button className="settings__deleteUser__btn btn col-12" onClick={onModalClick}>Usuń Konto</button>
                </div>

                {showModal === true &&
                <div id="myModal" className="modal">

                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={onModalExit}>&times;</span>
                            <h2>Aby usunąć wpisz hasło</h2>
                        </div>
                        <div className="modal-body">
                            <label className="col-9 login__box__form__label">

                                <input className="header__label__input login__box__form__input" name="password" type="password"
                                       placeholder="Hasło" onChange={(event)=> {setPassword(event.target.value) }}/>
                            </label>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={onDeleteClick}>Zatwierdz</button>
                        </div>
                    </div>

                </div>
                }
            </div>
        </>
    )
}
export default Settings