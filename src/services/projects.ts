import {useQuery} from "@tanstack/react-query";
import {
    addProjectToFavorite,
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
    removeProjectFromFavorite
} from "./fStatsApi";
import {ApiMessage, Project} from "./types";

export const useProjects = () => useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: () => getAllProjects().then(data => data),
    staleTime: 5000
})

export const useProject = (projectId: number) => useQuery<Project, Error>({
    queryKey: [`project_${projectId}`],
    queryFn: () => getProject(projectId).then(data => data)
})

export const useCreateProject = (project: Project | undefined, token: string) => useQuery<ApiMessage, Error>({
    queryKey: [`projectCreate_${project?.id}`],
    queryFn: () => createProject(project!!, token).then(data => data),
    enabled: !!project?.name
})

export const useDeleteProject = (projectId: number, token: string) => useQuery<ApiMessage, Error>({
    queryKey: [`projectDelete_${projectId}`],
    queryFn: () => deleteProject(projectId, token).then(data => data),
    enabled: false
})

export const useAddProjectToFavorite = (projectId: number, token: string) => useQuery<ApiMessage, Error>({
    queryKey: [`projectDelete_${projectId}`],
    queryFn: () => addProjectToFavorite(projectId, token).then(data => data),
    enabled: false
})

export const useRemoveProjectFromFavorite = (projectId: number, token: string) => useQuery<ApiMessage, Error>({
    queryKey: [`projectDelete_${projectId}`],
    queryFn: () => removeProjectFromFavorite(projectId, token).then(data => data),
    enabled: false
})