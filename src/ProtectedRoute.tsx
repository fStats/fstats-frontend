import {useAuth} from "./hooks/useAuth";
import {Navigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {ReactElement} from "react";

export function ProtectedRoute(props: { children: ReactElement }) {

    const {isAuthorized} = useAuth()!!;
    const {enqueueSnackbar} = useSnackbar();

    if (!isAuthorized) {
        enqueueSnackbar("Access denied. Please authorize", {variant: "warning"})
        return <Navigate to="/login"/>
    }

    return <>{props.children}</>
}