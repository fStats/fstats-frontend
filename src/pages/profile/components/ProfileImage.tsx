import React from "react";
import {styled} from "@mui/material";

export function ProfileImage() {
    return(
        <>
            <Image src="https://avatars.githubusercontent.com/u/33298273?v=4"/>
        </>
    )
}

const Image = styled('img')`
  width: 100%;
`
