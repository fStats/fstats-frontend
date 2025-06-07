import {Mode} from "@pages/project/components/card/types";

export const getTimestamp = (mode: Mode): number => {
    const now = new Date();
    now.setMinutes(now.getMinutes() < 30 ? 0 : 30, 0, 0);

    switch (mode) {
        case "week":
            now.setDate(now.getDate() - 7);
            return now.getTime();
        case "month":
            now.setMonth(now.getMonth() - 1);
            return now.getTime();
        case "quarter":
            now.setMonth(now.getMonth() - 3);
            return now.getTime();
        case "all":
            return 0
    }
}
