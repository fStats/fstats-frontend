import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart,
    Colors,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Tooltip
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";
import {SnackbarProvider} from "notistack";
import {AuthProvider} from "./hooks/useAuth";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import GettingStartedPage from "./pages/gettingstarted/GettingStartedPage.tsx";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectsPage from "./pages/ProjectsPage";
import {LabelProvider} from "./hooks/useLabel";
import RegisterPage from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import FaqPage from "./pages/FaqPage";
import {ProtectedRoute} from "./ProtectedRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import {ExperimentalProjectPage} from "./pages/project/experemental/ExperimentalProjectPage.tsx";
import TermsPolicyPage from "./pages/TermsPolicyPage";
import {ChoroplethController, ColorScale, GeoFeature, ProjectionScale, SizeScale} from "chartjs-chart-geo";
import {SettingsProvider} from "./hooks/useSettings.tsx";

Chart.register(
    ArcElement,
    ChartDataLabels,
    zoomPlugin,
    Tooltip,
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Colors,
    TimeScale,
    GeoFeature,
    ChoroplethController,
    ColorScale,
    SizeScale,
    ProjectionScale,
    BarElement
);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchInterval: 1800000,
            cacheTime: 1800000,
            staleTime: 1800000
        }
    }
})

const theme = createTheme({
    palette: {
        mode: 'dark'
    },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <SettingsProvider>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <SnackbarProvider maxSnack={3}>
                        <AuthProvider userToken={localStorage.getItem("token") || ""}>
                            <LabelProvider>
                                <RouterProvider router={
                                    createBrowserRouter(
                                        createRoutesFromElements(
                                            <Route path="/" element={<RootPage/>}>
                                                <Route index element={<HomePage/>}/>
                                                <Route path="getting-started" element={<GettingStartedPage/>}/>
                                                <Route path="faq" element={<FaqPage/>}/>

                                                <Route path="login" element={<LoginPage/>}/>
                                                <Route path="register" element={<RegisterPage/>}/>

                                                <Route path="projects" element={<ProjectsPage/>}/>
                                                <Route path="project/:id" element={<ExperimentalProjectPage/>}/>

                                                <Route path="profile" element={
                                                    <ProtectedRoute children={<ProfilePage/>}/>
                                                }/>

                                                <Route path="terms-policy" element={<TermsPolicyPage/>}/>

                                                <Route path="*" element={<NotFoundPage/>}/>
                                            </Route>
                                        )
                                    )
                                }/>
                            </LabelProvider>
                        </AuthProvider>
                    </SnackbarProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </SettingsProvider>
    </React.StrictMode>
);