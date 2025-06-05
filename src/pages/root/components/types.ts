import {Dispatch, ReactNode} from "react";

export interface DrawerCloseProps {
    handleDrawerClose: () => void
}

export interface DrawerStateProps {
    isClosing: boolean;
    mobileOpen: boolean;
    setIsClosing: Dispatch<boolean>
    setMobileOpen: Dispatch<boolean>
}

export interface NavItem {
    icon: ReactNode;
    label: string;
    route: string;
}