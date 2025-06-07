import {Check} from "@mui/icons-material";
import {Avatar, Grid, IconButton, Typography} from "@mui/material";

import {useSettings} from "@hooks/useSettings";

export function LanguagePanel() {

    const {language, setLanguage} = useSettings();

    return (
        <Grid container spacing={2} columns={{xs: 4, sm: 8, md: 12}}>
            {/*Foreach available languages*/}
            <Grid size={{xs: 4, sm: 4, md: 4}} key="en" display="flex">
                <IconButton
                    sx={{
                        p: 2,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2,
                        gap: 2,
                        flexGrow: 1
                    }} onClick={() => {
                    // Change language
                }}>
                    <Avatar variant="square" alt="en"
                            src={`https://flagsapi.com/US/flat/64.png`}/>
                    <Typography variant="body1" sx={{flexGrow: 1}}>English</Typography>
                    {language === "en" && <Check/>}
                </IconButton>
            </Grid>
        </Grid>
    );
}