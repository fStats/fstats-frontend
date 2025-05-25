import {useSnackbar} from "notistack";
import {useEffect} from "react";
import {Navigate, useLocation} from "react-router-dom";

import {ProtectedRouteProps} from "@components/types";
import {useAuth} from "@hooks/useAuth";

export function ProtectedRoute(props: ProtectedRouteProps) {
    const redirectTo = props.redirectTo === undefined ? "/login" : props.redirectTo;

    const {isAuthorized} = useAuth();
    const {enqueueSnackbar} = useSnackbar();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthorized) {
            enqueueSnackbar("Access denied. Please authorize", {variant: "warning"});
        }
    }, [isAuthorized, enqueueSnackbar]);

    if (!isAuthorized) {
        return <Navigate to={redirectTo} replace state={{from: location}} />;
    }

    return props.children;
}