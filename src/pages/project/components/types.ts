import {DataValue} from "../../../services/types";

export interface CardProps {
    readonly title: string
    readonly metric: DataValue
}

export interface TimelineData {
    readonly x: number;
    readonly y: number;
}