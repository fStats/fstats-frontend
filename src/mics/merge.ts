import {DataValue} from "../services/types.ts";
import {TimelineData} from "../pages/project/experemental/types.ts";

export function mergeClientAndServerData(clientData: DataValue, serverData: DataValue): DataValue {
    const combinedData: DataValue = {...clientData}
    Object.entries(serverData).forEach(([key, value]) => combinedData[key] = (combinedData[key] || 0) + value)
    return combinedData
}

export function mergeData(clientData: TimelineData[], serverData: TimelineData[]): TimelineData[] {
    const merged: TimelineData[] = [];
    let i = 0, j = 0;

    while (i < serverData.length || j < clientData.length) {
        const serverPoint = serverData[i];
        const clientPoint = clientData[j];

        if (j >= clientData.length || (i < serverData.length && serverPoint.x < clientPoint.x)) {
            merged.push(serverPoint);
            i++;
        } else if (i >= serverData.length || (j < clientData.length && serverPoint.x > clientPoint.x)) {
            merged.push(clientPoint);
            j++;
        } else {
            merged.push({x: serverPoint.x, y: serverPoint.y + clientPoint.y});
            i++;
            j++;
        }
    }

    return merged;
}