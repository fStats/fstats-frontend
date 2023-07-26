import {useQuery} from "@tanstack/react-query";
import {deleteUser, getUser, getUserProjects} from "./fStatsApi";

export const useUser = (nameOrId: string | number) => useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(nameOrId).then(data => data)
})

export const useUserProjects = (userId: number) => useQuery({
    queryKey: ['userProjects'],
    queryFn: () => getUserProjects(userId).then(data => data)
})

export const useUserDelete = () => useQuery({
    queryKey: ['userDelete'],
    queryFn: () => deleteUser().then(data => data)
})