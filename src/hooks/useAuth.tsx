import {createContext, ReactNode, useContext, useState} from "react";
import {AuthContent} from "./types";


const AuthContext = createContext<AuthContent>({
    token: "",
    isAuthorized: false,
    setToken: () => {
    }
});

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