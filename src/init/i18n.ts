import i18nBase from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const repoBase = import.meta.env.BASE_URL || "/";
export const supportedLanguages = ["en", "fi"];

// eslint-disable-next-line import/no-named-as-default-member
const initPromise = i18nBase
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: supportedLanguages,
        backend: {
            loadPath: `${repoBase}locales/{{lng}}.json`,
        },
        ns: ["translation"],
        defaultNS: "translation",
        interpolation: {
            escapeValue: false,
        },
    });

export const i18n = Object.assign(i18nBase, { initPromise });

export default i18n;