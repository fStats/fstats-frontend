import {createGenericContext} from "./createGenericContext";
import {SettingsContent} from "./types";

const defaultSettings: SettingsContent = {
    colors: ["#e74c3cff", "#2ecc71ff", "#3498dbff", "#e67e22ff", "#f1c40fff"],
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