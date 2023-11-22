import {getPieMetric, getLineMetric} from "./fStatsApi";
import {useQuery} from "@tanstack/react-query";
import {LineMetric, PieMetric} from "./types";

export const useLineMetric = (projectId: number) => useQuery<LineMetric, Error>({
    queryKey: [`metricLine_${projectId}`],
    queryFn: () => getLineMetric(projectId).then(value => value)
})

export const usePieMetric = (projectId: number) => useQuery<PieMetric, Error>({
    queryKey: [`metricPie_${projectId}`],
    queryFn: () => getPieMetric(projectId)
})
