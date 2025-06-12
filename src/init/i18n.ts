import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const repoBase = import.meta.env.BASE_URL || "/";
export const supportedLanguages = ["en", "fi"];

export const initPromise = i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: supportedLanguages,
        backend: {
            loadPath: `${repoBase}locales/{{lng}}/{{ns}}.json`,
        },
        ns: [
            "common",
            "faq",
            "gettingStarted",
            "home",
            "login",
            "notfound",
            "profile",
            "project",
            "projects",
            "register",
            "settings",
            "shutdown",
            "terms",
        ],
        defaultNS: "common",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;