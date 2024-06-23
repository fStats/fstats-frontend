import {getLineMetric, getPieMetric} from "./fStatsApi";
import {useMutation, useQuery} from "@tanstack/react-query";
import {LineMetric, PieMetric} from "./types";

export const useLineMetricMutation = (projectId: number) => useMutation<LineMetric, Error, number | undefined>({
    mutationKey: [`metricLine_${projectId}`],
    mutationFn: (from) => getLineMetric(projectId, from).then(value => value),
})

export const usePieMetric = (projectId: number) => useQuery<PieMetric, Error>({
    queryKey: [`metricPie_${projectId}`],
    queryFn: () => getPieMetric(projectId)
})
