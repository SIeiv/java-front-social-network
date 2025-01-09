import './App.css'
import Auth from "@/pages/auth/auth.tsx";
import { Routes, Route } from "react-router";
import Main from "@/pages/main/main.tsx";
import FillProfile from "@/pages/fill-profile/fill-profile.tsx";


function App() {
    return (
        <div className={"w-screen h-screen bg-slate-50"}>
            <Routes>
                <Route path={"/*"} element={<Main/>} />
                <Route path="/auth/*" element={<Auth/>} />
                <Route path="/fill-profile" element={<FillProfile/>} />
            </Routes>
        </div>
    )
}

export default App