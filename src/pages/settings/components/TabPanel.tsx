import {Box} from "@mui/material";

import {TabPanelProps} from "@pages/settings/components/types";

export const TabPanel = ({children, value, index, ...other}: TabPanelProps) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`settings-tabpanel-${index}`}
        aria-labelledby={`settings-tab-${index}`}
        {...other}
    >
        {value === index && <Box sx={{p: 2}}>
            {children}
        </Box>}
    </div>
);