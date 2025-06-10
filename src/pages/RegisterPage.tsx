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
import {t} from "i18next";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {Trans} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";

import {Loader} from "@components/Loader";
import {useAuth} from "@hooks/useAuth";
import {useLabel} from "@hooks/useLabel";
import {useRegistration} from "@services/fstats/auth";
import {getTranslateKey} from "@services/fstats/i18n/serverMessages";
import {User} from "@services/fstats/types";

export default function RegisterPage() {
    const navigate = useNavigate();

    const {enqueueSnackbar} = useSnackbar();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [acceptTermsAndPolicy, setAcceptTermsAndPolicy] = useState(false);
    const [user, setUser] = useState<User>();

    const {data, status, error} = useRegistration(user);

    const {isAuthorized} = useAuth()!;
    if (isAuthorized) navigate("/profile");

    const {setLabel} = useLabel();

    useEffect(() => setLabel(t("page.register.label")), [setLabel]);

    if (status === "pending" && user) return (<Loader/>);

    if (status === "error" && user) {
        enqueueSnackbar(getTranslateKey(error?.message), {variant: "error"});
        setUser(undefined);
    }

    if (status === "success" && user) {
        if (data.code !== 201) {
            enqueueSnackbar(getTranslateKey(data.message), {variant: "warning"});
        } else {
            enqueueSnackbar(getTranslateKey(data.message), {variant: "success"});
            navigate("/login", {state: {username: username}});
        }
        setUser(undefined);
    }

    function registerUser(username: string, password: string, passwordRepeat: string) {
        if (username.trim() === "" || password.trim() === "") {
            enqueueSnackbar(t("page.register.field.empty"), {variant: "warning"});
            return;
        }

        if (password !== passwordRepeat) {
            enqueueSnackbar(t("page.register.field.mismatch"), {variant: "warning"});
            return;
        }

        setUser({
            username: username,
            password: password
        });
    }

    return (
        <Container maxWidth="xs">
            <Card>
                <Stack padding={2} spacing={2}>
                    <Typography variant="h4" align="center">
                        {t("page.register.header")}
                    </Typography>
                    <TextField label={t("page.register.field.username")} variant="outlined" type="text"
                               onChange={event => setUsername(event.target.value)}/>
                    <TextField label={t("page.register.field.password")} variant="outlined" type="password"
                               onChange={event => setPassword(event.target.value)}/>
                    <TextField label={t("page.register.field.passwordrepeat")} variant="outlined" type="password"
                               onChange={event => setPasswordRepeat(event.target.value)}/>
                    <FormControlLabel control={
                        <Checkbox checked={acceptTermsAndPolicy}
                                  onChange={event => setAcceptTermsAndPolicy(event.target.checked)}/>
                    } label={<Trans i18nKey="page.register.button.terms" components={{
                        redirect: <MuiLink href="/terms-policy" underline="none" target="_blank"/>
                    }}/>}/>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2}>
                        <Button disabled={!acceptTermsAndPolicy} color="inherit" variant="contained" sx={{flexGrow: 9}}
                                onClick={() => registerUser(username, password, passwordRepeat)}>
                            {t("page.register.button.register")}
                        </Button>
                        <Button color="inherit" variant="outlined" sx={{flexGrow: 1}} component={Link}
                                to="/login">
                            {t("page.register.button.login")}
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    );
}