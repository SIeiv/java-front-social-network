import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import AdminPanelItem from "@/pages/main/admin-panel-item.tsx";
import {useEffect, useState} from "react";
import {admin_getUsersAC} from "@/store/admin/actionCreators.ts";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import AdminPanelEditForm from "@/pages/main/admin-panel-edit-form.tsx";
import loadingCircles from "@/assets/bouncing-circles.svg";

const AdminPanel = () => {
    const dispatch = useAppDispatch();

    const users = useAppSelector(state => state.admin.users);

    const userEls = users.map(user => <AdminPanelItem user={user}/>);

    const isAdminPanelLoading = useAppSelector(state => state.loading.adminUsersLoading);


    const [addUserState, setAddUserState] = useState(false);

    useEffect(() => {
        dispatch(admin_getUsersAC());
    }, []);

    return (
        <div>

            <AdminPanelEditForm state={addUserState} setState={setAddUserState} type={"add"}/>

            <div className={"flex gap-4 items-start"}>
                <div className={"flex flex-col gap-y-4 w-[697px]"}>
                    {isAdminPanelLoading
                        ? <div className={"p-3 bg-white"}><img src={loadingCircles} alt="" className={"w-16 h-16 m-auto"}/></div>
                        : userEls}
                </div>
                <div className={"flex flex-col w-[319px] bg-white p-3 rounded-lg box-border sticky top-[96px]"}>
                    <Button className={"justify-start"} variant={"ghost"} onClick={() => {setAddUserState(true)}}>
                        <Plus/>
                        Добавить пользователя
                    </Button>
                </div>
            </div>
        </div>

    );
};

export default AdminPanel;