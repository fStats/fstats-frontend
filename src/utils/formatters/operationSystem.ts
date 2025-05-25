import {DataValue} from "@services/fstats/types";
import {KeyValue} from "@utils/convertors/types";

const osMap: KeyValue = {
    "l": "Linux",
    "m": "MacOS",
    "w": "Windows",
    "o": "Other",
};

export const formatOperationSystem = (data: DataValue) => Object.fromEntries(
    Object.entries(data).map(([value, count]) => [osMap[value] ?? value, count])
) as DataValue;
