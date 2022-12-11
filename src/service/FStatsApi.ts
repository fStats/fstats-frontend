import {Project} from "../dto/Project";
import axios from "axios";
import {LoaderFunctionArgs} from "react-router-dom";
import {Metrics} from "../dto/local/Metrics";

let requestUrl = "https://api.fstats.dev/v1/"

export const getAllProjects = async (): Promise<Array<Project>> => {
    return await axios.get(`${requestUrl}projects`).then(response => response.data);
}

export const getMetricById = async ({params}: LoaderFunctionArgs): Promise<Metrics> => {
    return await axios.get(`${requestUrl}metrics/${params.id}/all`).then(response => response.data);
}

