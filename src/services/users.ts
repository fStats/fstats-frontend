import {useMutation, useQuery} from "@tanstack/react-query";

import {useAuth} from "@hooks/useAuth";

import {deleteUser, getUser, getUserFavorites, getUserProjects, patchUser} from "./fStatsApi";
import {ApiMessage, Project, User} from "./types";

export const useUser = (id: number) => useQuery<User, Error>({
    queryKey: [`user_${id}`],
    queryFn: () => getUser(id).then(data => data)
})

export const useUserProjects = (userId: number) => useQuery<Project[], Error>({
    queryKey: [`userProjects_${userId}`],
    queryFn: () => getUserProjects(userId).then(data => data)
})

export const useUserFavorites = (userId: number, token: string) => useQuery<Project[], Error>({
    queryKey: [`userFavorites_${userId}`],
    queryFn: () => getUserFavorites(userId, token).then(data => data),
    enabled: useAuth()?.isAuthorized,
    placeholderData: []
})

export const useUserPatch = (token: string) => useMutation<ApiMessage, Error, User>({
    mutationKey: ["userPatch"],
    mutationFn: (user) => patchUser(token, user).then(data => data)
})

export const useUserDelete = (token: string) => useMutation<ApiMessage, Error>({
    mutationKey: ["userDelete"],
    mutationFn: () => deleteUser(token).then(data => data)
})