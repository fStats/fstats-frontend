import {useQuery} from "@tanstack/react-query";

import {login, registration} from "@services/fstats/api/auth";

import {ApiMessage, AuthToken, User} from "./types";

export const useRegistration = (user: User | undefined) => useQuery<ApiMessage, Error>({
    queryKey: ["registration", user],
    queryFn: () => registration(user!),
    enabled: (!!user?.username && !!user?.password)
});


export const useLogin = (user: User | undefined) => useQuery<AuthToken, Error>({
    queryKey: ["login"],
    queryFn: () => login(user!),
    enabled: (!!user?.username && !!user?.password)
});