import {t} from "i18next";

import {DataValue} from "@services/fstats/types";

export const formatOperationSystem = (data: DataValue) => Object.fromEntries(
    Object.entries(data).map(([value, count]) => [t(`page.project.os.${value}`) ?? value, count])
) as DataValue;
