import {useQuery} from "@tanstack/react-query";
import {deleteUser, getUser, getUserProjects} from "./fStatsApi";
import {ApiMessage, Project, User} from "./types";

export const useUser = (nameOrId: string | number) => useQuery<User, ApiMessage>({
    queryKey: ['user'],
    queryFn: () => getUser(nameOrId).then(data => data)
})

export const useUserProjects = (userId: number) => useQuery<Project[], ApiMessage>({
    queryKey: ['userProjects'],
    queryFn: () => getUserProjects(userId).then(data => data)
})

export const useUserDelete = () => useQuery<ApiMessage, ApiMessage>({
    queryKey: ['userDelete'],
    queryFn: () => deleteUser().then(data => data)
})