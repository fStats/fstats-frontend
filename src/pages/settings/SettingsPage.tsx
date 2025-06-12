import {Language, Palette} from "@mui/icons-material";
import {Box, Card, CardContent, Tab, Tabs} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {useLabel} from "@hooks/useLabel";
import {ChartPanel} from "@pages/settings/components/ChartPanel";
import {LanguagePanel} from "@pages/settings/components/LanguagePanel";
import {TabPanel} from "@pages/settings/components/TabPanel";

export const SettingsPage = () => {
    
    const {t} = useTranslation("settings");

    const [activeTab, setActiveTab] = useState(0);

    const {setLabel} = useLabel();

    useEffect(() => setLabel(t("label")), [setLabel, t]);

    return (
        <Box>
            <Card>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        variant="fullWidth"
                    >
                        <Tab
                            icon={<Palette/>}
                            label={t("tab.chart")}
                            iconPosition="start"
                        />
                        <Tab
                            icon={<Language/>}
                            label={t("tab.language")}
                            iconPosition="start"
                        />
                    </Tabs>
                </Box>

                <CardContent>
                    <TabPanel value={activeTab} index={0}>
                        <ChartPanel/>
                    </TabPanel>

                    <TabPanel value={activeTab} index={1}>
                        <LanguagePanel/>
                    </TabPanel>
                </CardContent>
            </Card>
        </Box>
    );
};