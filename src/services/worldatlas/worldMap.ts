import {useQuery} from "@tanstack/react-query";
import {Feature, topojson} from "chartjs-chart-geo";
import {FeatureCollection} from "geojson";

import {getWorldMap} from "./api";

export const useWorldMap = () => useQuery<Feature[], Error>({
    queryKey: ["worldMap"],
    queryFn: () => getWorldMap().then(data => (topojson.feature(data, data.objects.countries) as FeatureCollection).features),
    gcTime: 31556952000
});