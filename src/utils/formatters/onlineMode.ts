import {t} from "i18next";

import {DataValue} from "@services/fstats/types";

export const formatOnlineMode = (data: DataValue): DataValue => Object.fromEntries(
    Object.entries(data).map(([key, count]) => [t(`mode.${key}`, {ns: "project"}) ?? key, count])
);
