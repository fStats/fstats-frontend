import {getMetric, getMetricCount} from "./fStatsApi";
import {useQuery} from "@tanstack/react-query";

export const useMetric = (projectId: number) => useQuery({
    queryKey: ['metric'],
    queryFn: () => getMetric(projectId).then(value => value)
})

export const useMetricCount = (projectId: number) => useQuery({
    queryKey: ['metricCount'],
    queryFn: () => getMetricCount(projectId)
})