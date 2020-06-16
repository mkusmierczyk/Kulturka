import React from "react";
import app from "../settings/firebaseConfig"

export const SignOut = () => {
    return (
        <>
                <span> E-mail</span>
                <button onClick={ () => app.auth().signOut() }> Sign Out</button>
        </>
    )
};