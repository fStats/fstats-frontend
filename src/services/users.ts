import {useQuery} from "@tanstack/react-query";
import {deleteUser, getUser, getUserFavorites, getUserProjects} from "./fStatsApi";
import {ApiMessage, Project, User} from "./types";
import {useAuth} from "../hooks/useAuth";

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
    enabled: useAuth()?.isAuthorized
})

export const useUserDelete = (token: string) => useQuery<ApiMessage, Error>({
    queryKey: ["userDelete"],
    queryFn: () => deleteUser(token).then(data => data)
})