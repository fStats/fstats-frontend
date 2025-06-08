import {DataValue} from "@services/fstats/types";

export interface GroupedDataValue {
    [group: string]: DataValue;
}

export interface LanguageProgress {
    lang: string;
    percent: number
}

// Limited version of PieMetric
export interface PreviewData {
    fabric_api_version: DataValue,
    location: DataValue
    minecraft_version: DataValue;
}