import {DefaultProvidersProps, SettingsContent} from "./types.ts";
import {createContext, useContext, useState} from "react";

const SettingsContext = createContext<SettingsContent>({
    colors: [
        "#e74c3cff",
        "#2ecc71ff",
        "#3498dbff",
        "#e67e22ff",
        "#f1c40fff"
    ],
    setColors: () => {
    },
    language: "en",
    setLanguage: () => {
    }
});

export const SettingsProvider = (props: DefaultProvidersProps) => {

    const savedSettings = localStorage.getItem("settings")
    const settings = savedSettings ? JSON.parse(savedSettings) : undefined
    const [language, setLanguage] = useState<string>(settings?.language ?? "en");
    const [colors, setColors] = useState<string[]>(settings?.colors ?? [
        "#e74c3cff",
        "#2ecc71ff",
        "#3498dbff",
        "#e67e22ff",
        "#f1c40fff"
    ]);

    return (
        <SettingsContext.Provider value={{colors, setColors, language, setLanguage}}>
            {props.children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);