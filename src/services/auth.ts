import {useQuery} from "@tanstack/react-query";
import {User} from "./types";
import {login, registration} from "./fStatsApi";

export const useRegistration = (user: User) => useQuery({
    queryKey: ['registration'],
    queryFn: () => registration(user).then(data => data)
})

export const useLogin = (user: User) => useQuery({
    queryKey: ['login'],
    queryFn: () => login(user).then(data => data)
})