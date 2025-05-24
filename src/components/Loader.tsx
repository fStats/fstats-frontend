import {CircularProgress} from "@mui/material";

import CenteredContainer from "./CenteredContainer";

export function Loader() {
    return (
        <CenteredContainer>
            <CircularProgress/>
        </CenteredContainer>
    )
}