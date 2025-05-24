import {useState} from "react";

import {SettingsContent} from "@hooks/types";
import {createSettingsProvider} from "@hooks/useSettings";

export const SettingsProvider = createSettingsProvider((): SettingsContent => {
    const savedSettings = localStorage.getItem("settings");
    const settings = savedSettings ? JSON.parse(savedSettings) : undefined;

    const [language, setLanguage] = useState<string>(settings?.language ?? "en");
    const [colors, setColors] = useState<string[]>(settings?.colors ?? [
        "#e74c3cff",
        "#2ecc71ff",
        "#3498dbff",
        "#e67e22ff",
        "#f1c40fff"
    ]);

    return {language, setLanguage, colors, setColors};
}, "SettingsProvider");