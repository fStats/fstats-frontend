import {Dispatch, ReactNode, SetStateAction} from "react";

export interface AuthContent {
    token: string
    setToken: Dispatch<SetStateAction<string>>
    isAuthorized: boolean
}

export interface LabelContent {
    label: string
    setLabel: Dispatch<SetStateAction<string>>
}

export interface SettingsContent {
    colors: string[]
    setColors: Dispatch<SetStateAction<string[]>>
    language: string
    setLanguage: Dispatch<SetStateAction<string>>
}

export interface DefaultProvidersProps {
    children: ReactNode
}

export interface AuthProviderProps extends DefaultProvidersProps {
    userToken: string
}