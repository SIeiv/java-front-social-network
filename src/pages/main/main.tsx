import Header from "@/components/header.tsx";
import {useEffect} from "react";
import Sidebar from "@/pages/main/sidebar/sidebar.tsx";
import {Route, Routes, useNavigate} from "react-router";
import UserPage from "@/pages/main/user-page/user-page.tsx";
import Feed from "@/pages/main/feed.tsx";
import RouterFriends from "@/pages/main/router-friends.tsx";
import {useAppSelector} from "@/hooks.ts";
import Search from "@/pages/main/search.tsx";
import AdminPanel from "@/pages/main/admin-panel.tsx";
import {IDetailsResponse} from "@/api/auth/types.ts";


const Main = () => {
    const navigate = useNavigate();

    const profile = useAppSelector(state => state.auth.appInitializeData.initialUserData);
    const initializeState = useAppSelector(state => state.auth.appInitializeData.isLoading);

    /*const appIsInit = useAppSelector(state => state.auth.appInitializeData.initialized);*/

    useEffect(() => {
        console.log("Обновление мейна!")
        console.log("initial state", initializeState);
        console.log("profile", profile);

        if (!profile && !initializeState) {
            navigate("/auth/login");
        }

        if ((profile && !profile.verified) && !initializeState) {
            navigate("/fill-profile");
        }
    }, [profile, initializeState]);

    return (
        <div className={"bg-slate-50"}>
            <Header />

            <div className={"w-[1248px] m-auto mt-4 flex gap-4 box-border"}>
                <Sidebar/>
                <div>
                    <Routes>
                        <Route path="/my-page" element={<UserPage type={"my"}/>}/>
                        <Route path="/user/*" element={<UserPage type={"another"}/>}/>
                        <Route path="/friends/*" element={<RouterFriends/>}/>
                        <Route path="/feed/main" element={<Feed type={"main"}/>}/>
                        <Route path="/feed/recommended" element={<Feed type={"recommended"}/>}/>
                        <Route path="/my-friends/*" element={<RouterFriends/>}/>
                        <Route path="/search/*" element={<Search/>}/>
                        <Route path="/admin-panel" element={<AdminPanel/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Main;