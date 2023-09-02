import {useQuery} from "@tanstack/react-query";
import {deleteUser, getUser, getUserProjects} from "./fStatsApi";
import {ApiMessage, Project, User} from "./types";

export const useUser = (nameOrId: string | number) => useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => getUser(nameOrId).then(data => data)
})

export const useUserProjects = (userId: number) => useQuery<Project[], Error>({
    queryKey: ["userProjects"],
    queryFn: () => getUserProjects(userId).then(data => data)
})

export const useUserDelete = () => useQuery<ApiMessage, Error>({
    queryKey: ["userDelete"],
    queryFn: () => deleteUser().then(data => data)
})