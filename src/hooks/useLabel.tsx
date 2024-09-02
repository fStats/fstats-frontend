import {createContext, useContext, useState} from "react";
import {DefaultProvidersProps, LabelContent} from "./types";

const LabelContext = createContext<LabelContent>({
    setLabel: () => {
    },
    label: ""
});

export const LabelProvider = (props: DefaultProvidersProps) => {

    const [label, setLabel] = useState("");

    return (
        <LabelContext.Provider value={{label, setLabel}}>
            {props.children}
        </LabelContext.Provider>
    );
};

export const useLabel = () => useContext(LabelContext);