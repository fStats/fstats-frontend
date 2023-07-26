import {Container} from "@mui/material";
import {ReactNode} from "react";

interface ContainerProps {
    children: ReactNode;
}

export function CenteredContainer(props: ContainerProps) {
    return (<Container style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center"
        }}>
            {props.children}
        </Container>
    )
}