import SidebarButton from "@/pages/main/sidebar/sidebar-button.tsx";


const Sidebar = () => {
    return (
        <div className="flex flex-col w-[200px] bg-white p-3 rounded-lg box-border">
            <SidebarButton to={"/my-page"} text={"Профиль"}/>
            <SidebarButton to={"/feed/main"} text={"Лента"}/>
            <SidebarButton to={"/friends"} text={"Друзья"}/>
            <SidebarButton to={"/friends"} text={"Выход"}/>
        </div>
    );
};

export default Sidebar;