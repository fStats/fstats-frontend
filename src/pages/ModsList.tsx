import axios from "axios";
import {useState} from "react";
import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";

export function ModsList() {

    const requestUrl: string = "https://api.fstats.dev/v1/projects"

    const [projects, setProjects] = useState([Project])

    axios.get(requestUrl)
        .then(response => {
            setProjects(response.data);
        })
        .catch(error => {
            console.log("Error *** : " + error);
        });

    return (
        <Stack spacing={2} justifyContent="center" padding={4}>
            {
                projects.map((data) => (
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography>{data.id} | {data.name}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))
            }
        </Stack>
    )
}

let Project: {
     id: number
     name: string
     ownerId: number
}