import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ArcElement, Chart, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";
import {SnackbarProvider} from "notistack";
import {AuthProvider} from "./hooks/useAuth";
import {createTheme, ThemeProvider} from "@mui/material";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import HowToStartPage from "./pages/HowToStartPage";
import NotFoundPage from "./pages/NotFoundPage";

Chart.register(ArcElement, ChartDataLabels, zoomPlugin, Tooltip);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: -1,
            cacheTime: -1
        },
    },
})

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider maxSnack={3}>
                    <AuthProvider userToken={localStorage.getItem("token") || ""}>
                        <RouterProvider router={
                            createBrowserRouter(
                                createRoutesFromElements(
                                    <Route path="/" element={<RootPage/>}>
                                        <Route index element={<HomePage/>}/>
                                        <Route path="how-to-start" element={<HowToStartPage/>}/>
                                        <Route path="*" element={<NotFoundPage/>}/>
                                    </Route>
                                )
                            )
                        }/>
                    </AuthProvider>
                </SnackbarProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);