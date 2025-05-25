import {apiUrl} from "@init/env";
import {ApiMessage, Project, User} from "@services/fstats/types";

export const getUser = async (id: number): Promise<User> => {
    const response = await fetch(`${apiUrl}/users/${id}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as User
}

export const getUserProjects = async (userId: number): Promise<Project[]> => {
    const response = await fetch(`${apiUrl}/users/${userId}/projects`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Project[]
}

export const getUserFavorites = async (userId: number, token: string): Promise<Project[]> => {
    const response = await fetch(`${apiUrl}/users/${userId}/favorite`, {
        method: "GET", headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Project[]
}

export const patchUser = async (token: string, user: User): Promise<ApiMessage> => {
    const response = await fetch(`${apiUrl}/users`, {
        method: "PATCH", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }, body: JSON.stringify(user)
    })

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

export const deleteUser = async (token: string): Promise<ApiMessage> => {
    const response = await fetch(`${apiUrl}/users`, {
        method: "DELETE", headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}