import {LinkProps} from "@mui/material";
import {ReactNode} from "react";

export interface CentredContainerProps {
    children: ReactNode;
}

export interface ExternalLinkProps extends LinkProps {
    children?: ReactNode;
}

export interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
}
