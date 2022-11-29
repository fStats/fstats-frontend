import PrimarySearchAppBar from "./components/AppBar";
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Profile} from "./pages/Profile";
import {RandomMod} from "./pages/RandomMod";
import {GlobalStats} from "./pages/GlobalStats";
import {ModsList} from "./pages/ModsList";

export default function App() {
    return (
        <>
            <PrimarySearchAppBar/>
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/random" element={<RandomMod/>}/>
                    <Route path="/global" element={<GlobalStats/>}/>
                    <Route path="/list" element={<ModsList/>}/>
                </Routes>
            </Container>
        </>
    )
}