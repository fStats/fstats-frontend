import {Add, Delete} from "@mui/icons-material";
import {Box, ClickAwayListener, Divider, Grid, IconButton, Paper, Popper, Stack, TextField, useTheme} from "@mui/material"
import {MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {HexAlphaColorPicker} from "react-colorful";

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

    const previewData = useMemo(() => piePreviewData(colors.length), [colors]);

    const {firstItemRef, itemHeight} = useGridItemHeight();
    const [pickerAnchor, setPickerAnchor] = useState<null | HTMLElement>(null);
    const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);

    const handleClick = (event: MouseEvent<HTMLElement>, index: number) => {
        setPickerAnchor(event.currentTarget);
        setActiveColorIndex(index);
    };

    const handleClose = () => {
        setPickerAnchor(null);
        setActiveColorIndex(null);
    };

    const handleColorChange = useCallback((colorId: number, value: string) => {
        setColors(prev => {
            const current = prev.find(c => c.index === colorId);
            if (!current || current.color === value) return prev; // avoid unnecessary update
            return prev.map(c => c.index === colorId ? {...c, color: value} : c);
        });
    }, [setColors]);

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
                                        onClick={(e) => handleClick(e, index)}
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
            <Popper open={Boolean(pickerAnchor)} anchorEl={pickerAnchor} placement="bottom-start">
                {activeColorIndex !== null && (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box sx={{p: 1, bgcolor: "background.paper", borderRadius: 1, boxShadow: 3}}>
                            <HexAlphaColorPicker
                                color={colors[activeColorIndex].color}
                                onChange={(newColor) => handleColorChange(colors[activeColorIndex].index, newColor)}
                            />
                        </Box>
                    </ClickAwayListener>
                )}
            </Popper>
        </Stack>
    )
}