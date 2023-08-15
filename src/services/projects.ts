import {useQuery} from "@tanstack/react-query";
import {createProject, deleteProject, getAllProjects, getProject} from "./fStatsApi";
import {ApiMessage, Project} from "./types";

export const useProjects = () => useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: () => getAllProjects().then(data => data)
})

export const useProject = (projectId: number) => useQuery<Project, Error>({
    queryKey: ['project'],
    queryFn: () => getProject(projectId).then(data => data)
})

export const useCreateProject = (project: Project, token: string) => useQuery<ApiMessage, Error>({
    queryKey: ['projectCreate'],
    queryFn: () => createProject(project, token).then(data => data)
})

export const useDeleteProject = (projectId: number, token: string) => useQuery<ApiMessage, Error>({
    queryKey: ['projectDelete'],
    queryFn: () => deleteProject(projectId, token).then(data => data)
})
