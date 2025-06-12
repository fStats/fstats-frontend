import {ThemeProvider} from "@mui/material";
import {QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider} from "notistack";
import {StrictMode, Suspense} from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";

import {Loader} from "@components/Loader";
import {AuthProvider} from "@hooks/provides/AuthProvider";
import {LabelProvider} from "@hooks/provides/LabelProvider";
import {SettingsProvider} from "@hooks/provides/SettingsProvider";
import {initPromise} from "@init/i18n";
import {theme} from "@init/muitheme";
import {queryClient} from "@init/reactquary";
import {routes} from "@init/routes";

import "@init/chartjs";
import "@init/syntaxhighlighter";

initPromise.then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <SettingsProvider>
                <ThemeProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <SnackbarProvider maxSnack={3}>
                            <AuthProvider>
                                <LabelProvider>
                                    <Suspense fallback={<Loader />}>
                                        <RouterProvider router={routes}/>
                                    </Suspense>
                                </LabelProvider>
                            </AuthProvider>
                        </SnackbarProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </SettingsProvider>
        </StrictMode>
    );
});