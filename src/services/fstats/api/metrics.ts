import {apiUrl} from "@init/env";
import {ApiMessage, LineMetric, PieMetric} from "@services/fstats/types";

export const getLineMetric = async (projectId: number, from: number, serverSide: boolean): Promise<LineMetric> => {
    const response = await fetch(`${apiUrl}/metrics/${projectId}/line?server_side=${serverSide}${(from !== undefined && from > 0) ? `&from=${from / 1000}` : ""}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as LineMetric
}

export const getPieMetric = async (projectId: number, serverSide: boolean): Promise<PieMetric> => {
    const response = await fetch(`${apiUrl}/metrics/${projectId}/pie?server_side=${serverSide}`)

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as PieMetric
}