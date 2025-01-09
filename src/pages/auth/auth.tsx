import Register from "@/pages/auth/register.tsx";
import Login from "@/pages/auth/login.tsx";
import {Routes, Route, useNavigate} from "react-router";
import {useEffect} from "react";
import {useAppSelector} from "@/hooks.ts";

const Auth = () => {
    const navigate = useNavigate();

    const profile = useAppSelector(state => state.auth.profileData.profile);

    useEffect(() => {
        if (profile) {
            navigate("/");
        }
    }, [])

    return (
        <div className={"w-full h-full"}>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
    );
};

export default Auth;