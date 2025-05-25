import {ReactNode} from "react";

export interface NavItem {
    icon: ReactNode;
    label: string;
    route: string;
}