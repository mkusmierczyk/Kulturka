import React, {useContext} from "react";
import app from "../settings/firebaseConfig"
import {AuthContext} from "./auth";

export const SignOut = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            <div className="signOut">
                <span className=" signOut__name col-12">Witaj {currentUser.email}</span>
                <button className="signOut__name__btn" onClick={ () => app.auth().signOut() }> Wyloguj</button>
            </div>
        </>
    )
};