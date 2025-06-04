import {DataValue} from "@services/fstats/types";

export interface GroupedDataValue {
    [group: string]: DataValue;
}

// Limited version of PieMetric
export interface PreviewData {
    fabric_api_version: DataValue,
    location: DataValue
    minecraft_version: DataValue;
}