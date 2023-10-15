import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addProjectToFavorite,
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
    removeProjectFromFavorite
} from "./fStatsApi";
import {ApiMessage, Project, User} from "./types";
import {useAuth} from "../hooks/useAuth";

export const useProjects = () => useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: () => getAllProjects().then(data => data)
})

export const useProject = (projectId: number) => useQuery<Project, Error>({
    queryKey: [`project_${projectId}`],
    queryFn: () => getProject(projectId).then(data => data)
})

export const useCreateProject = () => {
    const queryClient = useQueryClient()
    const {token} = useAuth()!!
    return useMutation<ApiMessage, Error, Project>({
        mutationFn: (project) => createProject(project, token).then(data => data),
        onSettled: () => {
            const userId = (JSON.parse(atob(token.split('.')[1])) as User).id
            queryClient.invalidateQueries({queryKey: [`userProjects_${userId}`]});
            return queryClient.invalidateQueries({queryKey: ["projects"]});
        }
    });
}

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    const {token} = useAuth()!!
    return useMutation<ApiMessage, Error, number>({
        mutationFn: (projectId) => deleteProject(projectId, token).then(data => data),
        onSettled: () => {
            const userId = (JSON.parse(atob(token.split('.')[1])) as User).id
            queryClient.invalidateQueries({queryKey: [`userProjects_${userId}`]});
            return queryClient.invalidateQueries({queryKey: ["projects"]});
        }
    });
}

export const useAddProjectToFavorite = () => {
    const queryClient = useQueryClient()
    const {token} = useAuth()!!
    return useMutation<ApiMessage, Error, number>({
        mutationFn: (projectId) => addProjectToFavorite(projectId, token).then(data => data),
        onSettled: () => {
            const userId = (JSON.parse(atob(token.split('.')[1])) as User).id
            return queryClient.invalidateQueries({queryKey: [`userFavorites_${userId}`]});
        }
    });
}

export const useRemoveProjectFromFavorite = () => {
    const queryClient = useQueryClient()
    const {token} = useAuth()!!
    return useMutation<ApiMessage, Error, number>({
        mutationFn: (projectId) => removeProjectFromFavorite(projectId, token).then(data => data),
        onSettled: () => {
            const userId = (JSON.parse(atob(token.split('.')[1])) as User).id
            return queryClient.invalidateQueries({queryKey: [`userFavorites_${userId}`]});
        }
    });
}