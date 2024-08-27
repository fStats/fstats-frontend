import {getLineMetric, getPieMetric} from "./fStatsApi";
import {useQuery} from "@tanstack/react-query";
import {LineMetric, PieMetric} from "./types";
import {Mode} from "../pages/project/components/card/TimelineCard.tsx";

export const useLineMetricMutation = (projectId: number, from: number, mode: Mode, serverSide: boolean) => useQuery<LineMetric, Error>({
    queryKey: ["metricLine", projectId, mode, serverSide],
    queryFn: () => getLineMetric(projectId, from, serverSide).then(value => value),
})

export const usePieMetric = (projectId: number, serverSide: boolean) => useQuery<PieMetric, Error>({
    queryKey: ["metricPie", projectId, serverSide],
    queryFn: () => getPieMetric(projectId, serverSide)
})
