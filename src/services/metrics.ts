import {getLineMetric, getPieMetric} from "./fStatsApi";
import {useQuery} from "@tanstack/react-query";
import {LineMetric, PieMetric} from "./types";
import {Mode} from "../pages/project/components/card/TimelineCard.tsx";

export const useLineMetricMutation = (projectId: number, from: number, mode: Mode) => useQuery<LineMetric, Error>({
    queryKey: ["metricLine", projectId, mode],
    queryFn: () => getLineMetric(projectId, from).then(value => value),
})

export const usePieMetric = (projectId: number) => useQuery<PieMetric, Error>({
    queryKey: ["metricPie", projectId],
    queryFn: () => getPieMetric(projectId)
})
