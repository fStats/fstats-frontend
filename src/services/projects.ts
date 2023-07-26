import {useQuery} from "@tanstack/react-query";
import {createProject, deleteProject, getAllProjects, getProject} from "./fStatsApi";
import {Project} from "./types";

export const useProjects = () => useQuery({
    queryKey: ['projects'],
    queryFn: () => getAllProjects().then(data => data)
})

export const useProject = (projectId: number) => useQuery({
    queryKey: ['project'],
    queryFn: () => getProject(projectId).then(data => data)
})

export const useCreateProject = (project: Project) => useQuery({
    queryKey: ['projectCreate'],
    queryFn: () => createProject(project).then(data => data)
})

export const useDeleteProject = (projectId: number) => useQuery({
    queryKey: ['projectDelete'],
    queryFn: () => deleteProject(projectId).then(data => data)
})
