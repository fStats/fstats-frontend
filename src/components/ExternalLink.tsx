import { Launch } from "@mui/icons-material";
import { Link } from "@mui/material";

import {ExternalLinkProps} from "@components/types";

export const ExternalLink = ({children, ...props}: ExternalLinkProps) => (
    <Link
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{display: "inline-flex", alignItems: "center", gap: 0.5}}
        {...props}
    >
        {children}
        <Launch fontSize="inherit"/>
    </Link>
);