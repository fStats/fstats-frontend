import {
    TimelineOppositeContent as BaseTimelineOppositeContent,
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator
} from "@mui/lab";
import {Box, styled, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";

import {News} from "./types";

export default function ShutdownPage() {
    const {data} = useQuery<News[], Error>({
        queryFn: () => fetch("https://raw.githubusercontent.com/fStats/.github/refs/heads/main/news_updates.json").then((response) => response.json()),
        queryKey: ["news"]
    })

    const TimelineOppositeContent = styled(BaseTimelineOppositeContent)({
        flex: 0.1,
    });

    return <>
        <Box flexGrow={1} padding={2} textAlign="center">
            <Typography variant="h2">Service temporary shutdown</Typography>
            <Typography variant="h4" paddingTop={2}>News / Updates</Typography>
        </Box>
        {data && <Timeline>
            {data.map((item, index) =>
                <TimelineItem id={String(index)}>
                    <TimelineOppositeContent color="textSecondary">
                        {new Date(item.date * 1000).toLocaleString()}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography>{item.text}</Typography>
                    </TimelineContent>
                </TimelineItem>
            )}
        </Timeline>}
    </>
}
