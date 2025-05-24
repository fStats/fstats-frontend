import {useState} from "react";

import {LabelContent} from "@hooks/types";
import {createLabelProvider} from "@hooks/useLabel";

export const LabelProvider = createLabelProvider((): LabelContent => {
    const [label, setLabel] = useState("");
    return {label, setLabel};
}, "LabelProvider");