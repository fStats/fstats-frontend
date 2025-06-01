import {useState} from "react";

import {ColorSettings, SettingsContent} from "@hooks/types";
import {createSettingsProvider, defaultSettings} from "@hooks/useSettings";

export const SettingsProvider = createSettingsProvider((): SettingsContent => {
    const savedSettings = localStorage.getItem("settings");
    const settings: SettingsContent = savedSettings ? JSON.parse(savedSettings) : defaultSettings;

    const [language, setLanguage] = useState<string>(settings.language);
    const [colors, setColors] = useState<ColorSettings[]>(settings.colors);

    return {language, setLanguage, colors, setColors};
}, "SettingsProvider");