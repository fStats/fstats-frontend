import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Root from "./Root";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ArcElement, Chart, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";
import {SnackbarProvider} from "notistack";
import {AuthProvider} from "./hooks/useAuth";

Chart.register(ArcElement, ChartDataLabels, zoomPlugin, Tooltip);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        },
    },
})

ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={3}>
                <AuthProvider userToken={localStorage.getItem("token") || ""}>
                    <RouterProvider router={
                        createBrowserRouter(
                            createRoutesFromElements(
                                <Route path="/" element={<Root/>}>
                                    <Route index element={<HomePage/>}/>

                                    {/*<Route path="login" element={<LoginPage/>}/>*/}
                                    {/*<Route path="register" element={<RegisterPage/>}/>*/}

                                    {/*<Route path="random" element={<RandomModPage/>}/>*/}

                                    {/*<Route path="mods" element={<ModsListPage/>}/>*/}
                                    {/*<Route path="mods/:modId" element={<ModPage/>}/>*/}

                                    {/*<Route path="profile" element={*/}
                                    {/*    <ProtectedRoute>*/}
                                    {/*        <ProfilePage/>*/}
                                    {/*    </ProtectedRoute>*/}
                                    {/*}/>*/}

                                    {/*<Route path="create" element={*/}
                                    {/*    <ProtectedRoute>*/}
                                    {/*        <CreateProjectPage/>*/}
                                    {/*    </ProtectedRoute>*/}
                                    {/*}/>*/}

                                    {/*<Route path="tutorial" element={<TutorialPage/>}/>*/}

                                    <Route path="*" element={<NotFoundPage/>}/>
                                </Route>
                            )
                        )
                    }/>
                </AuthProvider>
            </SnackbarProvider>
        </QueryClientProvider>
    </React.StrictMode>
);