import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addProjectToFavorite,
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
    patchProject,
    removeProjectFromFavorite
} from "./fStatsApi";
import {ApiMessage, Project} from "./types";
import {useAuth} from "../hooks/useAuth";
import {getUserFromJWT} from "../mics/decoder/jwt.ts";

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
            const userId = getUserFromJWT(token).id
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
            const userId = getUserFromJWT(token).id
            queryClient.invalidateQueries({queryKey: [`userProjects_${userId}`]});
            return queryClient.invalidateQueries({queryKey: ["projects"]});
        }
    });
}

export const useEditProject = (projectId: number) => {
    const queryClient = useQueryClient()
    const {token} = useAuth()!!
    return useMutation<ApiMessage, Error, Project>({
        mutationFn: (project) => patchProject(projectId, project, token).then(data => data),
        onSettled: () => {
            const userId = getUserFromJWT(token).id
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
            const userId = getUserFromJWT(token).id
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
            const userId = getUserFromJWT(token).id
            return queryClient.invalidateQueries({queryKey: [`userFavorites_${userId}`]});
        }
    });
}