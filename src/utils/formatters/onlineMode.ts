import {DataValue} from "@services/types";
import {KeyValue} from "@utils/convertors/types";

const onlineModeMap: KeyValue = {
    "true": "Online",
    "false": "Offline",
};

export const formatOnlineMode = (data: DataValue): DataValue => Object.fromEntries(
    Object.entries(data).map(([key, count]) => [onlineModeMap[key] ?? key, count])
);
