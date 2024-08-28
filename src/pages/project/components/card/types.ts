import {DataValue} from "../../../../services/types.ts";

export interface CardProps {
    readonly title: string
    readonly serverMetric: DataValue
    readonly clientMetric: DataValue
}

export interface TimelineCardProps {
    projectId: number
}