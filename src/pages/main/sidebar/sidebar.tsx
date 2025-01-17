import SidebarButton from "@/pages/main/sidebar/sidebar-button.tsx";
import {PanelTop, User, Users} from "lucide-react";


const Sidebar = () => {
    return (
        <div className="flex flex-col w-[200px] h-[200px] bg-white p-3 rounded-lg box-border sticky top-[96px]">
            <SidebarButton image={<User />} to={"/my-page"} text={"Профиль"}/>
            <SidebarButton image={<PanelTop />} to={"/feed/main"} text={"Лента"}/>
            <SidebarButton image={<Users />} to={"/my-friends/friends"} text={"Друзья"}/>
        </div>
    );
};

export default Sidebar;