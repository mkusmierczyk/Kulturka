import React, {useContext} from "react";
import app from "../settings/firebaseConfig"
import {AuthContext} from "./auth";
import {Link} from "react-router-dom";

export const SignOut = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
                <span>{currentUser.email}</span>
                <button onClick={ () => app.auth().signOut() }> Sign Out</button>

        </>
    )
};