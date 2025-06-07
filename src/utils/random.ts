import {DataValue} from "@services/fstats/types";

export const getRandomEntries = (keys: string[], count: number, min = 1, max = 20): DataValue => Object.fromEntries(
    keys.sort(() => 0.5 - Math.random())
        .slice(0, count)
        .map(k => [k, Math.floor(Math.random() * (max - min + 1)) + min])
);

export function getRandomHexRGBA(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.floor(Math.random() * 256);

    const toHex = (n: number) => n.toString(16).padStart(2, "0");

    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
}
