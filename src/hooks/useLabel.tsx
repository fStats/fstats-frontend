import {createContext, ReactNode, useContext, useState} from "react";
import {LabelContent} from "./types";

const LabelContext = createContext<LabelContent | null>(null);

export const LabelProvider = (props: { children: ReactNode }) => {

    const [label, setLabel] = useState("");

    return (
        <LabelContext.Provider value={{label, setLabel}}>
            {props.children}
        </LabelContext.Provider>
    );
};

export const useLabel = () => useContext(LabelContext);