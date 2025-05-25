import {apiUrl} from "@init/env";
import {ApiMessage, AuthToken, User} from "@services/fstats/types";

export const registration = async (user: User): Promise<ApiMessage> => {
    const response = await fetch(`${apiUrl}/auth/registration`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    })

    if (response.status !== 201) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

export const login = async (user: User): Promise<AuthToken> => {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    })

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as AuthToken
}
