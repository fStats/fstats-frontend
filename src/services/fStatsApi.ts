import {ApiMessage, AuthToken, Metric, MinecraftData, Project, User} from "./types";

const hostUrl: string = "https://api.fstats.dev/v2"

/*   USERS   */
export const getUser = async (nameOrId: string | number): Promise<User> =>
    await fetch(`${hostUrl}/users/${nameOrId}`).then(response => response.json())

export const getUserProjects = async (userId: number): Promise<Project[]> =>
    await fetch(`${hostUrl}/users/${userId}/projects`).then(response => response.json())

export const deleteUser = async (): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/projects`, {
        method: "DELETE",
        headers: {"Authorization": "Where is token :?)"}
    })

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

/*   PROJECTS   */
export const getAllProjects = async (): Promise<Project[]> =>
    await fetch(`${hostUrl}/projects`).then(response => response.json())

export const getProject = async (projectId: number): Promise<Project> =>
    await fetch(`${hostUrl}/projects/${projectId}`).then(response => response.json())

export const createProject = async (project: Project): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Where is token :?)"
        },
        body: JSON.stringify(project)
    })

    if (response.status !== 201) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

export const deleteProject = async (projectId: number): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/projects/${projectId}`, {
        method: "DELETE",
        headers: {"Authorization": "Where is token :) ?"}
    })

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

/*   METRICS   */
export const getMetric = async (projectId: number): Promise<Metric[]> =>
    await fetch(`${hostUrl}/metrics/${projectId}`).then(response => response.json())

export const getMetricCount = async (projectId: number): Promise<MinecraftData> =>
    await fetch(`${hostUrl}/metrics/${projectId}/count`).then(response => response.json())

/*   AUTH   */
export const registration = async (user: User): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/auth/registration`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    if (response.status !== 201) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

export const login = async (user: User): Promise<AuthToken> => {
    const response = await fetch(`${hostUrl}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as AuthToken
}