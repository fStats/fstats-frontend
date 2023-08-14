import {getMetric, getMetricCount} from "./fStatsApi";
import {useQuery} from "@tanstack/react-query";
import {ApiMessage, Metric, MinecraftData} from "./types";

export const useMetric = (projectId: number) => useQuery<Metric[], ApiMessage>({
    queryKey: ['metric'],
    queryFn: () => getMetric(projectId).then(value => value)
})

export const useMetricCount = (projectId: number) => useQuery<MinecraftData, ApiMessage>({
    queryKey: ['metricCount'],
    queryFn: () => getMetricCount(projectId)
})