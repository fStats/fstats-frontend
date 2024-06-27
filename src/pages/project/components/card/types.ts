import {DataValue} from "../../../../services/types.ts";

export interface CardProps {
    readonly title: string
    readonly metric: DataValue
}

export interface TimelineCardProps {
    projectId: number
}