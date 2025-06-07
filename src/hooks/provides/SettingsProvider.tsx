import {useState} from "react";

import {ColorSettings, SettingsContent} from "@hooks/types";
import {createSettingsProvider, defaultSettings} from "@hooks/useSettings";

const isColorSettingsArray = (arr: unknown): arr is ColorSettings[] => Array.isArray(arr) && arr.every(item =>
    typeof item === "object" &&
    item !== null &&
    typeof item.index === "number" &&
    typeof item.color === "string"
);

const isValidSettings = (obj: unknown): obj is SettingsContent => {
    if (typeof obj !== "object" || obj === null) return false;

    const settings = obj as Partial<SettingsContent>;

    return (typeof settings.language === "string" && isColorSettingsArray(settings.colors));
};

export const SettingsProvider = createSettingsProvider((): SettingsContent => {
    const savedSettings = localStorage.getItem("settings");
    const settings: SettingsContent = isValidSettings(savedSettings) ? JSON.parse(savedSettings) : defaultSettings;

    const [language, setLanguage] = useState<string>(settings.language);
    const [colors, setColors] = useState<ColorSettings[]>(settings.colors);

    return {language, setLanguage, colors, setColors};
}, "SettingsProvider");