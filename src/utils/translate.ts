import {namespaces, repoBase, supportedLanguages} from "@init/i18n";
import {LanguageProgress} from "@utils/types";

export const getTranslationProgress = async () => {
    const baseKeys = flattenKeys(await fetchAllNamespaces("en"));

    return (await Promise.all(
        supportedLanguages.map(async (lang): Promise<LanguageProgress | undefined> => {

            const percent = Math.round((flattenKeys(await fetchAllNamespaces(lang))
                .filter((key) => baseKeys.includes(key)).length / baseKeys.length) * 100);

            if (percent === 0 && lang !== "en") return undefined;

            return {lang, percent};
        })
    )).filter(Boolean) as LanguageProgress[];
};

const flattenKeys = (obj: Record<string, string>, prefix = ""): string[] =>
    Object.entries(obj).flatMap(([key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        return typeof value === "object" && value !== null
            ? flattenKeys(value, newKey)
            : [newKey];
    });

const fetchAllNamespaces = async (lang: string): Promise<Record<string, string>> =>
    Object.assign({}, ...await Promise.all(
        namespaces.map(async (ns) => {
            try {
                const res = await fetch(`${repoBase}locales/${lang}/${ns}.json`);
                if (!res.ok) {
                    console.warn(`Missing namespace "${ns}" for language "${lang}"`);
                    return {};
                }
                return await res.json();
            } catch (e) {
                console.warn(`Error loading namespace "${ns}" for "${lang}":`, e);
                return {};
            }
        })
    ));