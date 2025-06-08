import {repoBase, supportedLanguages} from "@init/i18n";

export async function getTranslationProgress() {
    const baseKeys = flattenKeys(await fetchTranslations("en"));

    return await Promise.all(
        supportedLanguages.map(async (lang) => ({
            lang, percent: Math.round((flattenKeys(await fetchTranslations(lang)).filter((key) =>
                baseKeys.includes(key)
            ).length / baseKeys.length) * 100)
        }))
    );
}

const flattenKeys = (obj: Record<string, string>, prefix = ""): string[] =>
    Object.entries(obj).flatMap(([key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        return typeof value === "object" && value !== null
            ? flattenKeys(value, newKey)
            : [newKey];
    });

const fetchTranslations = async (lang: string): Promise<Record<string, string>> => {
    try {
        const res = await fetch(`${repoBase}locales/${lang}.json`);

        if (!res.ok) {
            console.warn(`Translation file for "${lang}" not found (HTTP ${res.status})`);
            return {};
        }

        try {
            const json = JSON.parse(await res.text());

            if (typeof json !== "object" || json === null) {
                console.warn(`Translation file for "${lang}" is not valid JSON.`);
                return {};
            }

            return json;
        } catch (parseError) {
            console.warn(`Failed to parse "${lang}.json" as JSON (maybe it's index.html fallback):`, parseError);
            return {};
        }
    } catch (err) {
        console.error(`Failed to fetch translation for "${lang}":`, err);
        return {};
    }
};