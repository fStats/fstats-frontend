import {AccountCircle} from "@mui/icons-material";
import {IconButton, Menu, MenuItem} from "@mui/material";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "@hooks/useAuth";

export default function UserMenu() {

    const {setToken} = useAuth()
    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => setAnchorEl(null);

    const logout = () => {
        handleClose();
        setToken("");
        localStorage.removeItem("token");
        enqueueSnackbar("Have a nice day :)", { variant: "info" });
    };

    return (
        <>
            <IconButton size="large" color="inherit"
                        onClick={(event) => setAnchorEl(event.currentTarget)}>
                <AccountCircle/>
            </IconButton>
            <Menu
                disableScrollLock
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                keepMounted
                transformOrigin={{vertical: "top", horizontal: "right"}}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    navigate("/profile")
                }}>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    navigate("/settings")
                }}>
                    Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}