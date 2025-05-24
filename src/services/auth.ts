import {useQuery} from "@tanstack/react-query";

import {login, registration} from "./fStatsApi";
import {ApiMessage, AuthToken, User} from "./types";

export const useRegistration = (user: User | undefined) => useQuery<ApiMessage, Error>({
    queryKey: ["registration", user],
    queryFn: () => registration(user!).then(data => data),
    enabled: (!!user?.username && !!user?.password)
})


export const useLogin = (user: User | undefined) => useQuery<AuthToken, Error>({
    queryKey: ["login"],
    queryFn: () => login(user!).then(data => data),
    enabled: (!!user?.username && !!user?.password)
})