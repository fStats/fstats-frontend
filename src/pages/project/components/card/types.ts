import {DataValue} from "@services/types";

export interface CardProps {
    readonly clientMetric: DataValue
    readonly serverMetric: DataValue
    readonly title: string
}

export interface TimelineCardProps {
    projectId: number
}