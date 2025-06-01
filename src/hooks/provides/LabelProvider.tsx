import {useState} from "react";

import {LabelContent} from "@hooks/types";
import {createLabelProvider, defaultSettings} from "@hooks/useLabel";

export const LabelProvider = createLabelProvider((): LabelContent => {
    const [label, setLabel] = useState(defaultSettings.label);
    return {label, setLabel};
}, "LabelProvider");