import {DataValue} from "../../services/types.ts";
import {KeyValue} from "../convertor/types.ts";

const osMap: KeyValue = {
    "l": "Linux",
    "m": "MacOS",
    "w": "Windows",
    "o": "Other",
};

export const formatOperationSystem = (data: DataValue) => Object.fromEntries(
    Object.entries(data).map(([value, count]) => [osMap[value] ?? value, count])
) as DataValue;
