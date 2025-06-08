import {useEffect, useState} from "react";

import {ColorSettings, SettingsContent} from "@hooks/types";
import {createSettingsProvider, defaultSettings} from "@hooks/useSettings";
// eslint-disable-next-line import/no-named-as-default
import i18n from "@init/i18n";

const isColorSettingsArray = (arr: unknown): arr is ColorSettings[] => Array.isArray(arr) && arr.every(item =>
    typeof item === "object" &&
    item !== null &&
    typeof item.index === "number" &&
    typeof item.color === "string"
);

const isValidSettings = (obj: unknown): obj is SettingsContent => {
    if (typeof obj !== "object" || obj === undefined) return false;

    const settings = obj as Partial<SettingsContent>;

    return (typeof settings.language === "string" && isColorSettingsArray(settings.colors));
};

export const SettingsProvider = createSettingsProvider((): SettingsContent => {
    const savedSettings = localStorage.getItem("settings");
    const parsed = savedSettings ? JSON.parse(savedSettings) : undefined;
    const settings: SettingsContent = isValidSettings(parsed) ? parsed : defaultSettings;

    const [language, setLanguage] = useState<string>(settings.language);
    const [colors, setColors] = useState<ColorSettings[]>(settings.colors);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, setLanguage]);

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify({language, colors}));
    }, [language, colors]);

    return {language, setLanguage, colors, setColors};
}, "SettingsProvider");