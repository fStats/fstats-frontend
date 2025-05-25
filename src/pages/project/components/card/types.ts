import {DataValue} from "@services/fstats/types";

export interface CardProps {
    readonly clientMetric: DataValue
    readonly serverMetric: DataValue
    readonly title: string
}

export interface TimelineCardProps {
    projectId: number
}