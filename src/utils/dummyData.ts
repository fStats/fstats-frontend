import {TimelineData} from "@pages/project/components/types";
import {iso2code} from "@utils/convertors/country"
import {getRandomEntries} from "@utils/random"
import {PreviewData} from "@utils/types";

const versions = [
    "1.18", "21w37a", "21w38a", "21w39a", "21w40a", "21w41a",
    "1.19", "22w11a", "22w12a", "22w13a", "22w14a", "22w15a", "22w16a", "22w17a", "22w18a", "22w19a", "22w20a", "22w21a", "22w22a",
    "1.20", "23w03a", "23w04a", "23w05a", "23w06a", "23w07a", "23w08a", "23w09a", "23w10a", "23w11a", "23w12a", "23w13a", "23w14a", "23w15a", "23w16a", "23w17a", "23w18a", "23w19a",
    "1.21", "24w03a", "24w04a", "24w05a", "24w06a", "24w07a", "24w08a", "24w09a", "24w10a", "24w11a", "24w12a", "24w13a", "24w14a", "24w15a", "24w16a", "24w17a", "24w18a", "24w19a", "24w20a", "24w21a", "24w22a", "24w23a", "24w24a", "24w25a",
    "1.21.1", "1.21.2", "1.21.3", "1.21.4", "1.21.5"
]

const fabricApiVersion = [
    "0.100.8+1.20.6",
    "0.114.1+1.21.3",
    "0.116.1+1.21.1",
    "0.119.3+1.21.4",
    "0.124.0+1.21.5",
    "0.124.2+1.21.5",
    "0.125.0+1.21.5",
    "0.125.3+1.21.5",
    "0.42.1+1.18",
    "0.43.1+1.18.1",
    "0.44.0+1.18.2",
    "0.55.3+1.19",
    "0.58.0+1.19.1",
    "0.60.0+1.19.2",
    "0.70.0+1.19.3",
    "0.75.1+1.18.2",
    "0.76.0+1.19.2",
    "0.76.1+1.19.3",
    "0.83.1+1.20.1",
    "0.87.2+1.19.4",
    "0.91.0+1.20",
    "0.91.0+1.20.1",
    "0.92.6+1.20.1",
    "0.97.2+1.20.4",
    "0.97.8+1.20.5",
]

export const piePreviewData = (count: number = 10): PreviewData => ({
    fabric_api_version: getRandomEntries(fabricApiVersion, count),
    minecraft_version: getRandomEntries(versions, count),
    location: getRandomEntries(Object.keys(iso2code), count, 5, 15)
})

export const linePreviewData = (
    stepMs = 30 * 60 * 1000,
    durationMs = 6 * 60 * 60 * 1000,
    min = 5,
    max = 30
): TimelineData[] => {
    const now = Date.now();
    const data: TimelineData[] = [];

    for (let t = now - durationMs; t <= now; t += stepMs) {
        data.push({x: t, y: Math.floor(Math.random() * (max - min + 1)) + min});
    }

    return data;
};