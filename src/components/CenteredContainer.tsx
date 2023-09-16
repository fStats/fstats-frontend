import {Container} from "@mui/material";
import {CentredContainerProps} from "./types";
import {CSSProperties} from "react";

export default function CenteredContainer(props: CentredContainerProps) {

    const containerStyle: CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
    }

    return (
        <Container style={containerStyle}>
            {props.children}
        </Container>
    )
}