import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

interface ContextContent {
    token: string,
    setToken: Dispatch<SetStateAction<string>>
    isAuthorized: boolean
}

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