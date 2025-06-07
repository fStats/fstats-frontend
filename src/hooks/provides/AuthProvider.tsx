import {useState} from "react";

import {AuthContent} from "@hooks/types";
import {createAuthProvider, defaultSettings} from "@hooks/useAuth";

export const AuthProvider = createAuthProvider((): AuthContent => {
    const savedToken = localStorage.getItem("token");
    const [token, setToken] = useState(savedToken || defaultSettings.token);
    const isAuthorized = !!token;

    return {token, setToken, isAuthorized};
}, "AuthProvider");