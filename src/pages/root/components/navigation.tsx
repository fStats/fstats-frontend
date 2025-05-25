import {FormatListBulleted, Gavel, Home, MenuBook, QuestionAnswer} from "@mui/icons-material";

import {NavItem} from "@pages/root/components/types";

export const navigationRoutes: NavItem[] = [
    {
        label: "Home",
        route: "/",
        icon: <Home/>
    },
    {
        label: "Getting started",
        route: "/getting-started",
        icon: <MenuBook/>
    },
    {
        label: "Projects catalogue",
        route: "/projects",
        icon: <FormatListBulleted/>
    },
    {
        label: "FAQ",
        route: "/faq",
        icon: <QuestionAnswer/>
    },
    {
        label: "Terms & Policy",
        route: "/terms-policy",
        icon: <Gavel/>
    },
];