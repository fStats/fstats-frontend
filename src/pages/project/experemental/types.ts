import {DataValue, PieMetric} from "@services/fstats/types";

export interface ChartsTabProps {
    clientPieData?: PieMetric
    serverPieData?: PieMetric
    value: number
}

export interface GroupedDataValue {
    [group: string]: DataValue;
}

export interface TimelineData {
    readonly x: number;
    readonly y: number;
}

export enum MetricTab {
    Client = 0,
    Mixed = 1,
    Server = 2
}