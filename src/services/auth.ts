import {useQuery} from "@tanstack/react-query";
import {ApiMessage, AuthToken, User} from "./types";
import {login, registration} from "./fStatsApi";

export const useRegistration = (user: User | undefined) => useQuery<ApiMessage, ApiMessage>({
    queryKey: ['registration', user],
    queryFn: () => registration(user!!).then(data => data),
    enabled: (!!user?.username && !!user?.password)
})


export const useLogin = (user: User | undefined) => useQuery<AuthToken, ApiMessage>({
    queryKey: ['login'],
    queryFn: () => login(user!!).then(data => data),
    enabled: (!!user?.username && !!user?.password)
})