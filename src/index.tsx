import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Profile} from "./pages/Profile";
import {RandomMod} from "./pages/RandomMod";
import {GlobalStats} from "./pages/GlobalStats";
import {ModsList} from "./pages/ModsList";
import Root from "./Root";
import {Home} from "./pages/Home";

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <RouterProvider router={
        createBrowserRouter(
            createRoutesFromElements(
                <Route path="/" element={<Root/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/random" element={<RandomMod/>}/>
                    <Route path="/global" element={<GlobalStats/>}/>
                    <Route path="/list" element={<ModsList/>}/>
                </Route>
            )
        )
    }/>
);