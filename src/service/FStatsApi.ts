import {Project} from "../dto/Project";
import axios from "axios";

let requestUrl = "https://api.fstats.dev/v1/"

export const getAllProjects = async (): Promise<Array<Project>> => {
    return await axios.get(`${requestUrl}projects`).then(response => response.data);
}

export const getSideMetricById = async (id: number) => {
    return await axios.get(`${requestUrl}metrics/${id}/side`).then(response => response.data);
}

export const getMinecraftVersionMetricById = async (id: number) => {
    return await axios.get(`${requestUrl}metrics/${id}/mcversion`).then(response => response.data);
}

export const getOnlineModeMetricById = async (id: number) => {
    return await axios.get(`${requestUrl}metrics/${id}/onlinemode`).then(response => response.data);
}

export const getModVersionMetricById = async (id: number) => {
    return await axios.get(`${requestUrl}metrics/${id}/modversion`).then(response => response.data);
}

export const getOperationSystemMetricById = async (id: number) => {
    return await axios.get(`${requestUrl}metrics/${id}/os`).then(response => response.data);
}

export const getLocationMetricById = async (id: number) => {
    return await axios.get(`${requestUrl}metrics/${id}/location`).then(response => response.data);
}