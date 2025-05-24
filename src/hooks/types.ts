import {Context, Dispatch, ReactElement, ReactNode, SetStateAction} from "react";

export type CreateProvider<T> = (initializer: () => T, ProviderName?: string) => ProviderComponent

export type ProviderComponent = ((props: DefaultProvidersProps) => ReactElement) & {
    displayName: string;
}

export interface AuthContent {
    isAuthorized: boolean
    setToken: Dispatch<SetStateAction<string>>
    token: string
}

export interface DefaultProvidersProps {
    children: ReactNode
}

export interface GenericContextProvider<T> {
    Context: Context<T>
    createProvider: CreateProvider<T>
    useGenericContext: () => T
}

export interface LabelContent {
    label: string
    setLabel: Dispatch<SetStateAction<string>>
}

export interface SettingsContent {
    colors: string[]
    language: string
    setColors: Dispatch<SetStateAction<string[]>>
    setLanguage: Dispatch<SetStateAction<string>>
}