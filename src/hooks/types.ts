import {Dispatch, SetStateAction} from "react";

export interface ContextContent {
    token: string,
    setToken: Dispatch<SetStateAction<string>>
    isAuthorized: boolean
}

export interface LabelContent {
    label: string,
    setLabel: Dispatch<SetStateAction<string>>
}