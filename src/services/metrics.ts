import {getMetricCount, getMetricTimeline} from "./fStatsApi";
import {useQuery} from "@tanstack/react-query";
import {DataValue, ProjectWithMinecraftData} from "./types";

export const useMetricTimeline = (projectId: number) => useQuery<DataValue, Error>({
    queryKey: [`metricTimeline_${projectId}`],
    queryFn: () => getMetricTimeline(projectId).then(value => value)
})

export const useMetricCount = (projectId: number) => useQuery<ProjectWithMinecraftData, Error>({
    queryKey: [`metricCount_${projectId}`],
    queryFn: () => getMetricCount(projectId)
})