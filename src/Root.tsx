import PrimaryAppBar from "./components/AppBar";
import {Container} from "@mui/material";
import React from "react";
import {Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <PrimaryAppBar/>
            <Container maxWidth="xl">
                <Outlet/>
            </Container>
        </>
    )
}