import {createGenericContext} from "./createGenericContext";
import {LabelContent} from "./types";

const defaultSettings: LabelContent = {
    label: "",
    setLabel: () => {
    },
};

export const {
    useGenericContext: useLabel,
    createProvider: createLabelProvider
} = createGenericContext<LabelContent>(defaultSettings);

