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


const Main = () => {
    const navigate = useNavigate();

    const me: any = useAppSelector(state => state.auth.appInitializeData.me);
    const initializeState = useAppSelector(state => state.auth.appInitializeData.isLoading);
    const isLoginLoading = useAppSelector(state => state.auth.authData.isLoading);

    /*const appIsInit = useAppSelector(state => state.auth.appInitializeData.initialized);*/

    useEffect(() => {

        /*if (!me && !initializeState && !isLoginLoading) {
            navigate("/auth/login");
        }*/

        if ((me.profileId === "") && !initializeState) {
            navigate("/fill-profile");
        }
    }, [me, initializeState]);

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
                        <Route path="/my-friends/*" element={<RouterFriends/>}/>
                        <Route path="/feed/main" element={<Feed type={"main"}/>}/>
                        <Route path="/search/*" element={<Search/>}/>
                        <Route path="/feed/recommended" element={<Feed type={"recommended"}/>}/>
                        {/*

                        <Route path="/admin-panel" element={<AdminPanel/>}/>*/}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Main;