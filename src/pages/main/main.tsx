import Header from "@/components/header.tsx";
import {useEffect} from "react";
import Sidebar from "@/pages/main/sidebar/sidebar.tsx";
import {Route, Routes} from "react-router";
import UserPage from "@/pages/main/user-page/user-page.tsx";
import Feed from "@/pages/main/feed.tsx";


const Main = () => {
    useEffect(() => {

    }, [])

    return (
        <div className={"bg-slate-50"}>
            <Header />

            <div className={"w-[1248px] m-auto mt-4 flex gap-4 box-border"}>
                <Sidebar/>
                <div>
                    <Routes>
                        <Route path="/my-page" element={<UserPage type={"my"}/>}/>
                        <Route path="/user/*" element={<UserPage type={"another"}/>}/>
                        <Route path="/feed" element={<Feed />}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Main;