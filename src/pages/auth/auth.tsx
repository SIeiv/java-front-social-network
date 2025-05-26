import Register from "@/pages/auth/register.tsx";
import Login from "@/pages/auth/login.tsx";
import {Routes, Route} from "react-router";
import {useEffect} from "react";

const Auth = () => {
    //const navigate = useNavigate();

    //const me = useAppSelector(state => state.auth.appInitializeData.me);

    useEffect(() => {
        /*if (localStorage.getItem("accessToken") !== null) {
            navigate("/my-page");
        }*/
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