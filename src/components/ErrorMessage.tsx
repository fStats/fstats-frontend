import {useSnackbar} from "notistack";
import {ReactNode} from "react";

export function ErrorMessage(props: { message: string, children?: ReactNode }) {
    const {enqueueSnackbar} = useSnackbar()
    enqueueSnackbar(props.message, {variant: "error"})
    return (<>{props.children && <>{props.children}</>}</>)
}