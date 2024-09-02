import {ApiMessage, AuthToken, LineMetric, PieMetric, Project, User} from "./types";

const hostUrl: string = "http://0.0.0.0:1540/v3"

/*   USERS   */
export const getUser = async (id: number): Promise<User> => {
    const response = await fetch(`${hostUrl}/users/${id}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as User
}

export const getUserProjects = async (userId: number): Promise<Project[]> => {
    const response = await fetch(`${hostUrl}/users/${userId}/projects`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Project[]
}

export const getUserFavorites = async (userId: number, token: string): Promise<Project[]> => {
    const response = await fetch(`${hostUrl}/users/${userId}/favorite`, {
        method: "GET", headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Project[]
}

export const patchUser = async (token: string, user: User): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/users`, {
        method: "PATCH", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }, body: JSON.stringify(user)
    })

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

export const deleteUser = async (token: string): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/users`, {
        method: "DELETE", headers: {
            "Authorization": `Bearer ${token}`
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

export const addProjectToFavorite = async (projectId: number, token: string): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/projects/${projectId}/favorite`, {
        method: "POST", headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

export const removeProjectFromFavorite = async (projectId: number, token: string): Promise<ApiMessage> => {
    const response = await fetch(`${hostUrl}/projects/${projectId}/favorite`, {
        method: "DELETE", headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as ApiMessage
}

/*   METRICS   */
export const getLineMetric = async (projectId: number, from: number, serverSide: boolean): Promise<LineMetric> => {
    console.log(from)
    const response = await fetch(`${hostUrl}/metrics/${projectId}/line?server_side=${serverSide}${(from !== undefined && from > 0) ? `&from=${from / 1000}` : ""}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as LineMetric
}

export const getPieMetric = async (projectId: number, serverSide: boolean): Promise<PieMetric> => {
    const response = await fetch(`${hostUrl}/metrics/${projectId}/pie?server_side=${serverSide}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as PieMetric
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