import {getMetric, getMetricCount} from "./fStatsApi";
import {useQuery} from "@tanstack/react-query";
import {ProjectWithMetric, ProjectWithMinecraftData} from "./types";

export const useMetric = (projectId: number) => useQuery<ProjectWithMetric, Error>({
    queryKey: [`metric_${projectId}`],
    queryFn: () => getMetric(projectId).then(value => value)
})

export const useMetricCount = (projectId: number) => useQuery<ProjectWithMinecraftData, Error>({
    queryKey: [`metricCount_${projectId}`],
    queryFn: () => getMetricCount(projectId)
})