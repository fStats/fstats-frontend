import {LineMetric} from "../../services/types.ts";
import {TimelineData} from "../../pages/project/experemental/types.ts";

export function decodeLineMetric(data: LineMetric | undefined): TimelineData[] {
    if (data === undefined) return []

    let prevTimestamp = 0;
    let prevCount = 0;

    return data.timestamps.map((deltaTimestamp, index) => {
        prevTimestamp += deltaTimestamp;
        prevCount += data.counts[index];
        return {x: prevTimestamp * 1000, y: prevCount};
    });
}
