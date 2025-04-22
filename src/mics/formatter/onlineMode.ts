import {DataValue} from "../../services/types.ts";
import {KeyValue} from "../convertor/types.ts";

const onlineModeMap: KeyValue = {
    "true": "Online",
    "false": "Offline",
};

export const formatOnlineMode = (data: DataValue): DataValue => Object.fromEntries(
    Object.entries(data).map(([key, count]) => [onlineModeMap[key] ?? key, count])
);
