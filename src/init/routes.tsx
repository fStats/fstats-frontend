import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";

import {ProtectedRoute} from "@components/ProtectedRoute";
import {isShutdown} from "@init/env";
import FaqPage from "@pages/FaqPage";
import GettingStartedPage from "@pages/gettingstarted/GettingStartedPage";
import HomePage from "@pages/HomePage";
import {LoginPage} from "@pages/LoginPage";
import NotFoundPage from "@pages/NotFoundPage";
import ProfilePage from "@pages/profile/ProfilePage";
import {ProjectPage} from "@pages/project/ProjectPage";
import ProjectsPage from "@pages/ProjectsPage";
import RegisterPage from "@pages/RegisterPage";
import RootPage from "@pages/root/RootPage";
import ShutdownPage from "@pages/ShutdownPage";
import TermsPolicyPage from "@pages/TermsPolicyPage";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        isShutdown ? <Route path="*" element={<ShutdownPage/>}/> :
            <Route path="/" element={<RootPage/>}>
                <Route index element={<HomePage/>}/>
                <Route path="getting-started" element={<GettingStartedPage/>}/>
                <Route path="faq" element={<FaqPage/>}/>

                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>

                <Route path="projects">
                    <Route index element={<ProjectsPage/>}/>
                    <Route path=":id" element={<ProjectPage/>}/>
                </Route>

                <Route path="profile" element={
                    <ProtectedRoute children={<ProfilePage/>}/>
                }/>

                <Route path="terms-policy" element={<TermsPolicyPage/>}/>

                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
    )
)