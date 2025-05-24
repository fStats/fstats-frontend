import {Topology} from "topojson-specification";

import {ApiMessage} from "@services/types";

export const getWorldMap = async (): Promise<Topology> => {
    const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Topology
}