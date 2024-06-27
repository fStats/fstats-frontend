import {DataValue} from "../../services/types.ts";

export const formatOnlineMode = (data: DataValue) => Object.fromEntries(
    Object.entries(data).map(([value, count]) => {
        if (value === "true") value = "Online";
        else if (value === "false") value = "Offline";
        return [value, count];
    })
) as DataValue
