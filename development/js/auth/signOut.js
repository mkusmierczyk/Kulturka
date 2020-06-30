import React, {useContext} from "react";
import app from "../settings/firebaseConfig"
import {AuthContext} from "./auth";

export const SignOut = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            <div className="signOut row">
                <span className=" signOut__name col-10">Witaj {currentUser.email}<button className="signOut__name__btn" onClick={ () => app.auth().signOut() }> Wyloguj</button></span>
            </div>
        </>
    )
};