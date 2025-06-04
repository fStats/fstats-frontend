import {DataValue} from "@services/fstats/types";
import {compareVersionsDesc} from "@utils/comparators/version";

import {mergeClientAndServerData} from "./merge";
import {GroupedDataValue} from "./types";

export const groupDataValues = (clientMetric: DataValue, serverMetric: DataValue): GroupedDataValue => Object
    .entries(mergeClientAndServerData(clientMetric, serverMetric) ?? [])
    .sort(([a], [b]) => compareVersionsDesc(
        a.split(".").slice(0, 2).join("."),
        b.split(".").slice(0, 2).join(".")
    ))
    .reduce((acc, [key, value]) => {
        const groupKey = key.split(".").slice(0, 2).join(".");
        if (!acc[groupKey]) acc[groupKey] = {};
        acc[groupKey][key] = value;
        return acc;
    }, {} as GroupedDataValue)