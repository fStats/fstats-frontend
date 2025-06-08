import {repoBase, supportedLanguages} from "@init/i18n";

export async function getTranslationProgress() {
    const base = await fetchTranslations("en");
    const baseKeys = flattenKeys(base);

    return await Promise.all(
        supportedLanguages.map(async (lang) => {
            const translated = await fetchTranslations(lang);
            const translatedKeys = flattenKeys(translated);

            const filledKeys = translatedKeys.filter((key) =>
                baseKeys.includes(key)
            );

            const percent = Math.round((filledKeys.length / baseKeys.length) * 100);

            return {lang, percent};
        })
    );
}

function flattenKeys(obj: Record<string, string>, prefix = ""): string[] {
    return Object.entries(obj).flatMap(([key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        return typeof value === "object" && value !== null
            ? flattenKeys(value, newKey)
            : [newKey];
    });
}

async function fetchTranslations(lang: string): Promise<Record<string, string>> {
    const res = await fetch(`${repoBase}locales/${lang}.json`);
    return await res.json();
}