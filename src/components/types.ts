import {ReactNode} from "react";

export interface CentredContainerProps {
    children: ReactNode
}

export interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
}
