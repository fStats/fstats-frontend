import {ApiMessage, AuthToken, Metric, MinecraftData, Project, User} from "./types";

const hostUrl: string = "https://api.fstats.dev/v2"

/*   USERS   */
export const getUser = async (nameOrId: string | number): Promise<User> => {
    const response = await fetch(`${hostUrl}/users/${nameOrId}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as User
}

export const getUserProjects = async (userId: number): Promise<Project[]> => {
    const response = await fetch(`${hostUrl}/users/${userId}/projects`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Project[]
}

export const deleteUser = async (): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/projects`, {
        method: "DELETE", headers: {
            "Authorization": "Where is token :?)"
        }
    })

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

/*   PROJECTS   */
export const getAllProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${hostUrl}/projects`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Project[]
}

export const getProject = async (projectId: number): Promise<Project> => {
    const response = await fetch(`${hostUrl}/projects/${projectId}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Project
}

export const createProject = async (project: Project, token: string): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/projects`, {
        method: "POST", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }, body: JSON.stringify(project)
    })

    if (response.status !== 201) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

export const deleteProject = async (projectId: number, token: string): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/projects/${projectId}`, {
        method: "DELETE", headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

/*   METRICS   */
export const getMetric = async (projectId: number): Promise<Metric[]> => {
    const response = await fetch(`${hostUrl}/metrics/${projectId}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Metric[]
}

export const getMetricCount = async (projectId: number): Promise<MinecraftData> => {
    const response = await fetch(`${hostUrl}/metrics/${projectId}/count`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as MinecraftData
}

/*   AUTH   */
export const registration = async (user: User): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/auth/registration`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    })

    if (response.status !== 201) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

export const login = async (user: User): Promise<AuthToken> => {
    const response = await fetch(`${hostUrl}/auth/login`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(user)
    })

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as AuthToken
}