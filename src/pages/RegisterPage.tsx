import {
    Button,
    Card,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Link as MuiLink,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import {Loader} from "@components/Loader";
import {useAuth} from "@hooks/useAuth";
import {useLabel} from "@hooks/useLabel";
import {useRegistration} from "@services/auth";
import {User} from "@services/types";

export default function RegisterPage() {
    const navigate = useNavigate()

    const {enqueueSnackbar} = useSnackbar();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [acceptTermsAndPolicy, setAcceptTermsAndPolicy] = useState(false)
    const [user, setUser] = useState<User>()

    const {data, status, error} = useRegistration(user)

    const {isAuthorized} = useAuth()!
    if (isAuthorized) navigate("/profile")

    useLabel()?.setLabel("Registration")

    if (status === "pending" && user) return (<Loader/>)

    if (status === "error" && user) {
        enqueueSnackbar(error?.message, {variant: "error"})
        setUser(undefined)
    }

    if (status === "success" && user) {
        if (data.code !== 201) {
            enqueueSnackbar(data.message, {variant: "warning"});
        } else {
            enqueueSnackbar(data.message, {variant: "success"})
            navigate("/login", {state: {username: username}})
        }
        setUser(undefined)
    }

    function registerUser(username: string, password: string, passwordRepeat: string) {
        if (username.trim() === "" || password.trim() === "") {
            enqueueSnackbar("Some fields is empty", {variant: "warning"})
            return
        }

        if (password !== passwordRepeat) {
            enqueueSnackbar("Password doesn't match", {variant: "warning"})
            return
        }

        setUser({
            username: username,
            password: password
        })
    }

    return (
        <Container maxWidth="xs">
            <Card>
                <Stack padding={2} spacing={2}>
                    <Typography variant="h4" align="center">Register</Typography>
                    <TextField label="Username" variant="outlined" type="text"
                               onChange={event => setUsername(event.target.value)}/>
                    <TextField label="Password" variant="outlined" type="password"
                               onChange={event => setPassword(event.target.value)}/>
                    <TextField label="Password repeat" variant="outlined" type="password"
                               onChange={event => setPasswordRepeat(event.target.value)}/>
                    <FormControlLabel control={
                        <Checkbox checked={acceptTermsAndPolicy}
                                  onChange={event => setAcceptTermsAndPolicy(event.target.checked)}/>
                    } label={<>
                        Accept <MuiLink href="/terms-policy" underline="none" target="_blank">Terms & Policy</MuiLink>
                    </>}/>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2}>
                        <Button disabled={!acceptTermsAndPolicy} color="inherit" variant="contained" sx={{flexGrow: 9}}
                                onClick={() => registerUser(username, password, passwordRepeat)}>Register</Button>
                        <Button color="inherit" variant="outlined" sx={{flexGrow: 1}} component={Link}
                                to="/login">Login</Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    )
}