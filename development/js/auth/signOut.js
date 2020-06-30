import React, {useContext} from "react";
import app from "../settings/firebaseConfig"
import {AuthContext} from "./auth";

export const SignOut = () => {
    const { currentUser } = useContext(AuthContext);

    const user = currentUser.email.substring(0, currentUser.email.lastIndexOf("@"))
  
    return (
        <>
            <div className="signOut row">
                <span className=" signOut__name col-10">Witaj {user}<button className="signOut__name__btn" onClick={ () => app.auth().signOut() }> Wyloguj</button></span>
            </div>
        </>
    )
};