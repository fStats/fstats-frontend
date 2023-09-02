import {createContext, ReactNode, useContext, useState} from "react";
import {ContextContent} from "./types";


const AuthContext = createContext<ContextContent | null>(null);

export const AuthProvider = (props: { userToken: string, children: ReactNode }) => {

    const [token, setToken] = useState(props.userToken);

    const isAuthorized = !(!token || token === "");

    return (
        <AuthContext.Provider value={{token, setToken, isAuthorized}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);