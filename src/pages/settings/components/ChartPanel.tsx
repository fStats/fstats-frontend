import {Add, Delete} from "@mui/icons-material";
import {Box, Divider, Grid, IconButton, Paper, Stack, TextField, useTheme} from "@mui/material"
import {useEffect, useRef, useState} from "react";

import {useSettings} from "@hooks/useSettings";
import {BarPreview} from "@pages/settings/components/previews/BarPreview";
import {LinePreview} from "@pages/settings/components/previews/LinePreview";
import {PiePreview} from "@pages/settings/components/previews/PiePreview";
import {WorldMapPreview} from "@pages/settings/components/previews/WorldMapPreview";
import {piePreviewData} from "@utils/dummyData";
import {getRandomHexRGBA} from "@utils/random";

const useGridItemHeight = () => {
    const [itemHeight, setItemHeight] = useState(0);
    const firstItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateHeight = () => {
            if (firstItemRef.current) {
                setItemHeight(firstItemRef.current.offsetHeight);
            }
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);
        if (firstItemRef.current) resizeObserver.observe(firstItemRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    return {firstItemRef, itemHeight};
};

export function ChartPanel() {

    const theme = useTheme()
    const {colors, setColors} = useSettings();
    const previewData = piePreviewData(colors.length)
    const {firstItemRef, itemHeight} = useGridItemHeight();

    const handleColorChange = (colorId: number, value: string) => {
        setColors(prev => prev.map(c =>
            c.index === colorId ? {...c, ["color"]: value} : c
        ));
    };

    const addNewColor = () => setColors(prev => [...prev, {
        index: colors[colors.length - 1].index + 1,
        color: getRandomHexRGBA(),
    }]);

    const removeColor = (colorId: number) => {
        setColors(prev => prev.filter(c => c.index !== colorId));
    };

    return (
        <Stack spacing={2}>
            <Grid container spacing={2} columns={{xs: 4, sm: 8, md: 12}}>
                {colors.map((color, index) => (
                    <Grid size={{xs: 4, sm: 4, md: 4}} key={color.index}
                          ref={index === 0 ? firstItemRef : null}>
                        <Paper
                            sx={{
                                p: 2,
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 2,
                            }}
                        >
                            <Stack spacing={2} direction="row">
                                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 2,
                                            backgroundColor: color.color,
                                            border: "2px solid",
                                            borderColor: "divider",
                                        }}
                                    />
                                </Box>
                                <TextField
                                    label="Color Code"
                                    value={color.color}
                                    onChange={(e) => handleColorChange(color.index, e.target.value)}
                                    fullWidth
                                    size="small"
                                    placeholder="#FF5733"
                                />
                                {colors.length > 5 && (
                                    <IconButton
                                        size="small"
                                        onClick={() => removeColor(color.index)}
                                        color="error"
                                    >
                                        <Delete/>
                                    </IconButton>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
                <Grid size={{xs: 4, sm: 4, md: 4}} display="flex">
                    <IconButton
                        sx={{
                            height: itemHeight > 0 ? `${itemHeight}px` : "auto",
                            flexGrow: 1,
                            border: 1,
                            borderColor: theme.palette.primary.main,
                            borderRadius: 2,
                        }}
                        size="small"
                        color="primary"
                        onClick={addNewColor}
                    >
                        <Add/>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider/>
            <Grid container spacing={2} columns={{xs: 4, sm: 4, md: 8}}>
                <Grid size={{xs: 4, sm: 4, md: 4}}>
                    <LinePreview/>
                </Grid>
                <Grid size={{xs: 4, sm: 4, md: 4}}>
                    <PiePreview previewData={previewData.minecraft_version}/>
                </Grid>
                <Grid size={{xs: 4, sm: 4, md: 4}}>
                    <BarPreview previewData={previewData.fabric_api_version}/>
                </Grid>
                <Grid size={{xs: 4, sm: 4, md: 4}}>
                    <WorldMapPreview previewData={previewData.location}/>
                </Grid>
            </Grid>
        </Stack>
    )
}