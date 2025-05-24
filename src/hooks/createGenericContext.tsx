import {createContext, useContext,} from "react";

import {CreateProvider, DefaultProvidersProps, GenericContextProvider} from "@hooks/types";

export function createGenericContext<T>(defaultValue: T): GenericContextProvider<T> {
    const Context = createContext<T>(defaultValue);

    const useGenericContext = () => useContext(Context);

    const createProvider: CreateProvider<T> = (
        initializer: () => T,
        ProviderName = "GenericProvider"
    ) => {
        const Provider = (props: DefaultProvidersProps) => {
            const value = initializer();
            return <Context.Provider value={value}>{props.children}</Context.Provider>;
        };
        Provider.displayName = ProviderName;
        return Provider;
    };

    return {Context, useGenericContext, createProvider};
}