import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {ProfilePage} from "./pages/ProfilePage";
import {RandomModPage} from "./pages/RandomModPage";
import {GlobalStatsPage} from "./pages/GlobalStatsPage";
import {ModsListPage} from "./pages/ModsListPage";
import Root from "./Root";
import {HomePage} from "./pages/HomePage";
import {getAllProjects} from "./service/FStatsApi";
import {ModPage} from "./pages/ModPage";
import {NotFoundPage} from "./pages/NotFoundPage";

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <RouterProvider router={
        createBrowserRouter(
            createRoutesFromElements(
                <Route path="/" element={<Root/>}>
                    <Route index element={<HomePage/>}/>

                    <Route path="random" element={<RandomModPage/>}/>

                    <Route path="mods" loader={getAllProjects} element={<ModsListPage/>}/>
                    <Route path="mods/:modId" element={<ModPage/>}/>

                    <Route path="global" element={<GlobalStatsPage/>}/>

                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path="profile/:username" element={<ProfilePage/>}/>

                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            )
        )
    }/>
);