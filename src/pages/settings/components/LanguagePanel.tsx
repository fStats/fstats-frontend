import {Check} from "@mui/icons-material";
import {Avatar, Grid, IconButton, Typography} from "@mui/material";
import {useEffect, useState} from "react";

import {useSettings} from "@hooks/useSettings";
import {getTranslationProgress} from "@utils/translate";

export function LanguagePanel() {

    const [progressList, setProgressList] = useState<{lang:string, percent: number}[]>([]);

    const {language, setLanguage} = useSettings();
    const displayNames = new Intl.DisplayNames(["en"], {type: "language"});

    const flagMapper: Record<string, string> = {
        "EN": "US"
    };

    useEffect(() => {
        getTranslationProgress()
            .then(setProgressList);
    }, []);

    return (
        <Grid container spacing={2} columns={{xs: 4, sm: 8, md: 12}}>
            {progressList.map(({lang, percent}) => (
                <Grid size={{xs: 4, sm: 4, md: 4}} key={lang} display="flex">
                    <IconButton
                        sx={{
                            p: 2,
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 2,
                            gap: 2,
                            flexGrow: 1
                        }} onClick={() => setLanguage(lang)}>
                        <Avatar variant="square" alt={lang}
                                src={`https://flagsapi.com/${flagMapper[lang.toUpperCase()] ?? lang.toUpperCase()}/flat/64.png`}/>
                        <Typography variant="body1"
                                    sx={{flexGrow: 1}}>{displayNames.of(lang)}: {percent}%</Typography>
                        {language === lang && <Check/>}
                    </IconButton>
                </Grid>
            ))}
        </Grid>
    );
}