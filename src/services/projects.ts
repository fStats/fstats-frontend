import {useQuery} from "@tanstack/react-query";
import {createProject, deleteProject, getAllProjects, getProject} from "./fStatsApi";
import {ApiMessage, Project} from "./types";

export const useProjects = () => useQuery<Project[], ApiMessage>({
    queryKey: ['projects'],
    queryFn: () => getAllProjects().then(data => data)
})

export const useProject = (projectId: number) => useQuery<Project, ApiMessage>({
    queryKey: ['project'],
    queryFn: () => getProject(projectId).then(data => data)
})

export const useCreateProject = (project: Project) => useQuery<ApiMessage, ApiMessage>({
    queryKey: ['projectCreate'],
    queryFn: () => createProject(project).then(data => data)
})

export const useDeleteProject = (projectId: number) => useQuery<ApiMessage, ApiMessage>({
    queryKey: ['projectDelete'],
    queryFn: () => deleteProject(projectId).then(data => data)
})
