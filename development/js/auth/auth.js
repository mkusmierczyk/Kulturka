import React, {useEffect, useState} from "react";
import app from "../settings/firebaseConfig";

export const AuthContext = React.createContext();

export const Auth = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
            console.log(user)
        });
    }, []);


    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};