import {useQuery} from "@tanstack/react-query";
import {deleteUser, getUser, getUserProjects} from "./fStatsApi";
import {ApiMessage, Project, User} from "./types";

export const useUser = (id: number) => useQuery<User, Error>({
    queryKey: [`user_${id}`],
    queryFn: () => getUser(id).then(data => data)
})

export const useUserProjects = (userId: number) => useQuery<Project[], Error>({
    queryKey: [`userProjects_${userId}`],
    queryFn: () => getUserProjects(userId).then(data => data)
})

export const useUserDelete = () => useQuery<ApiMessage, Error>({
    queryKey: ["userDelete"],
    queryFn: () => deleteUser().then(data => data)
})