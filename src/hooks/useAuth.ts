import {createGenericContext} from "./createGenericContext";
import {AuthContent} from "./types";

export const defaultSettings: AuthContent = {
    token: "",
    setToken: () => {
    },
    isAuthorized: false,
};

export const {
    useGenericContext: useAuth,
    createProvider: createAuthProvider
} = createGenericContext<AuthContent>(defaultSettings);