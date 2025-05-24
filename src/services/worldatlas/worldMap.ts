import {useQuery} from "@tanstack/react-query";
import {Feature, topojson} from "chartjs-chart-geo";
import {FeatureCollection} from "geojson";

import {getWorldMap} from "./worldAtlasApi";

export const useWorldMap = () => useQuery<Feature[], Error>({
    queryKey: ["worldMap"],
    queryFn: () => getWorldMap().then(data => (topojson.feature(data, data.objects.countries) as FeatureCollection).features),
    cacheTime: 31556952000
})