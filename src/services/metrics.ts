import {getMetric, getMetricCount} from "./fStatsApi";
import {useQuery} from "@tanstack/react-query";
import {Metric, MinecraftData} from "./types";

export const useMetric = (projectId: number) => useQuery<Metric[], Error>({
    queryKey: ['metric'],
    queryFn: () => getMetric(projectId).then(value => value)
})

export const useMetricCount = (projectId: number) => useQuery<MinecraftData, Error>({
    queryKey: ['metricCount'],
    queryFn: () => getMetricCount(projectId)
})