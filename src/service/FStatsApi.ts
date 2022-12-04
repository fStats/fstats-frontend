import {Project} from "../dto/Project";
import axios from "axios";
import {LoaderFunctionArgs} from "react-router-dom";
import {Metric} from "../dto/Metric";

let requestUrl = "https://api.fstats.dev/v1/"

export const getAllProjects = async (): Promise<Array<Project>> => {
    return await axios.get(`${requestUrl}projects`).then(response => response.data);
}

export const getMetricForProject = async ({params}: LoaderFunctionArgs): Promise<Array<Metric>> => {
    return await axios.get(`${requestUrl}metrics/${params.id}`).then(response => response.data);
}

