import {DataValue} from "../../services/types.ts";

export const formatOperationSystem = (data: DataValue) => Object.fromEntries(
    Object.entries(data).map(([value, count]) => {
        if (value === 'l') value = "Linux"
        else if (value === 'm') value = "MacOS"
        else if (value === 'w') value = "Windows"
        else if (value === 'o') value = "Other"
        return [value, count];
    })
) as DataValue