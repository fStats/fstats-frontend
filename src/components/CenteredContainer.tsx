import {Container} from "@mui/material";
import {CSSProperties} from "react";

import {CentredContainerProps} from "./types";

export default function CenteredContainer(props: CentredContainerProps) {

    const containerStyle: CSSProperties = {

        /**
         * First 64px is Appbar toolbar
         * Second 64px is spacing for other windows correction
         * */
        height: "calc(100svh - 64px - 64px)",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <Container style={containerStyle}>
            {props.children}
        </Container>
    )
}