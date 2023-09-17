import {Dispatch, SetStateAction} from "react";

export interface AuthContent {
    token: string,
    setToken: Dispatch<SetStateAction<string>>
    isAuthorized: boolean
}

export interface LabelContent {
    label: string,
    setLabel: Dispatch<SetStateAction<string>>
}