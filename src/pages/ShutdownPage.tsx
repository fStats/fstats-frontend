import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import {Box, CssBaseline, Typography} from "@mui/material";
import {useEffect} from "react";

import {Loader} from "@components/Loader";
import {useLabel} from "@hooks/useLabel";
import {useNews} from "@services/news/news";

export default function ShutdownPage() {

    const {data, status, error} = useNews();
    
    const {setLabel} = useLabel();
    
    useEffect(() => setLabel("Downtime"), [setLabel]);

    return (
        <Box padding={4}>
            <CssBaseline/>
            <Box flexGrow={1} padding={2} textAlign="center">
                <Typography variant="h2">Service temporary shutdown</Typography>
                <Typography variant="h4" paddingTop={2}>News / Updates</Typography>
            </Box>
            {status === "pending" && <Loader/>}
            {error && <Typography variant="body2" paddingTop={2}>{error.message}</Typography>}
            {data && <Timeline>
                {data.map((item, index) =>
                    <TimelineItem id={String(index)}>
                        <TimelineOppositeContent color="textSecondary" sx={{flex: 0.1}}>
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
        </Box>
    );
}
