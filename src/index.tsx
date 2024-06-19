import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {
    ArcElement,
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
import {createTheme, ThemeProvider} from "@mui/material";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import HowToStartPage from "./pages/howtostart/HowToStartPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectsPage from "./pages/ProjectsPage";
import {LabelProvider} from "./hooks/useLabel";
import ProjectPage from "./pages/project/ProjectPage";
import RegisterPage from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import FaqPage from "./pages/FaqPage";
import {ProtectedRoute} from "./ProtectedRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import TermsPolicyPage from "./pages/TermsPolicyPage";
import {ChoroplethController, ColorScale, GeoFeature, ProjectionScale, SizeScale} from "chartjs-chart-geo";

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
);

export const queryClient = new QueryClient()

const theme = createTheme({
    palette: {
        mode: 'dark'
    },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
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
                                            <Route path="how-to-start" element={<HowToStartPage/>}/>
                                            <Route path="faq" element={<FaqPage/>}/>

                                            <Route path="login" element={<LoginPage/>}/>
                                            <Route path="register" element={<RegisterPage/>}/>

                                            <Route path="projects" element={<ProjectsPage/>}/>
                                            <Route path="project/:id" element={<ProjectPage/>}/>

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
    </React.StrictMode>
);