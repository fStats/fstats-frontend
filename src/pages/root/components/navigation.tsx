import {FormatListBulleted, Gavel, Home, MenuBook, QuestionAnswer} from "@mui/icons-material";

import {NavItem} from "@pages/root/components/types";

export const navigationRoutes: NavItem[] = [
    {
        label: "root.drawer.home",
        route: "/",
        icon: <Home/>
    },
    {
        label: "root.drawer.getting",
        route: "/getting-started",
        icon: <MenuBook/>
    },
    {
        label: "root.drawer.projects",
        route: "/projects",
        icon: <FormatListBulleted/>
    },
    {
        label: "root.drawer.faq",
        route: "/faq",
        icon: <QuestionAnswer/>
    },
    {
        label: "root.drawer.terms",
        route: "/terms-policy",
        icon: <Gavel/>
    },
];