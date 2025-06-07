import {apiUrl} from "@init/env";
import {ApiMessage, Project} from "@services/fstats/types";

export const getAllProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${apiUrl}/projects`);

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message);

    return await response.json() as Project[];
};

export const getProject = async (projectId: number): Promise<Project> => {
    const response = await fetch(`${apiUrl}/projects/${projectId}`);

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message);

    return await response.json() as Project;
};

export const createProject = async (project: Project, token: string): Promise<ApiMessage> => {
    const response = await fetch(`${apiUrl}/projects`, {
        method: "POST", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }, body: JSON.stringify(project)
    });

    if (response.status !== 201) throw new Error((await response.json() as ApiMessage).message);

    return await response.json() as ApiMessage;
};

export const deleteProject = async (projectId: number, token: string): Promise<ApiMessage> => {
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
        method: "DELETE", headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message);

    return await response.json() as ApiMessage;
};

export const patchProject = async (projectId: number, project: Project, token: string): Promise<ApiMessage> => {
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
        method: "PATCH", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }, body: JSON.stringify(project)
    });

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message);

    return await response.json() as ApiMessage;
};

export const addProjectToFavorite = async (projectId: number, token: string): Promise<ApiMessage> => {
    const response = await fetch(`${apiUrl}/projects/${projectId}/favorite`, {
        method: "POST", headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message);

    return await response.json() as ApiMessage;
};

export const removeProjectFromFavorite = async (projectId: number, token: string): Promise<ApiMessage> => {
    const response = await fetch(`${apiUrl}/projects/${projectId}/favorite`, {
        method: "DELETE", headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status !== 202) throw new Error((await response.json() as ApiMessage).message);

    return await response.json() as ApiMessage;
};