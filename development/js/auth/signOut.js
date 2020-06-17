import React, {useContext} from "react";
import app from "../settings/firebaseConfig"
import {AuthContext} from "./auth";

export const SignOut = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            <div className="row signOut">
                <span className=" signOut__name">Witaj {currentUser.email}</span>
                <button className="signOut__name__btn" onClick={ () => app.auth().signOut() }> Wyloguj</button>
            </div>
        </>
    )
};