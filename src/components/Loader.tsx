import CenteredContainer from "./CenteredContainer";
import {CircularProgress} from "@mui/material";

export function Loader() {
    return (
        <CenteredContainer>
            <CircularProgress/>
        </CenteredContainer>
    )
}