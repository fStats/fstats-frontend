import {createGenericContext} from "./createGenericContext";
import {SettingsContent} from "./types";

export const defaultSettings: SettingsContent = {
    colors: [
        {
            index: 0,
            color: "#e74c3cff"
        },
        {
            index: 1,
            color: "#2ecc71ff"
        },
        {
            index: 2,
            color: "#3498dbff"
        },
        {
            index: 3,
            color: "#e67e22ff"
        },
        {
            index: 4,
            color: "#f1c40fff"
        }
    ],
    setColors: () => {
    },
    language: "en",
    setLanguage: () => {
    }
};

export const {
    useGenericContext: useSettings,
    createProvider: createSettingsProvider
} = createGenericContext<SettingsContent>(defaultSettings);