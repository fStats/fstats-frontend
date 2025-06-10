import {FormatListBulleted, Gavel, Home, MenuBook, QuestionAnswer} from "@mui/icons-material";

import {NavItem} from "@pages/root/components/types";

export const navigationRoutes: NavItem[] = [
    {
        label: "page.root.drawer.home",
        route: "/",
        icon: <Home/>
    },
    {
        label: "page.root.drawer.getting",
        route: "/getting-started",
        icon: <MenuBook/>
    },
    {
        label: "page.root.drawer.projects",
        route: "/projects",
        icon: <FormatListBulleted/>
    },
    {
        label: "page.root.drawer.faq",
        route: "/faq",
        icon: <QuestionAnswer/>
    },
    {
        label: "page.root.drawer.terms",
        route: "/terms-policy",
        icon: <Gavel/>
    },
];