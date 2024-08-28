import {DataValue, PieMetric} from "../../../services/types.ts";

export interface GroupedDataValue {
    [group: string]: DataValue;
}

export interface ChartsTabProps {
    value: number
    clientPieData?: PieMetric
    serverPieData?: PieMetric
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