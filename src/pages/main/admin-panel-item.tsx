import {FC, useState} from 'react';
import {IDetailsResponse} from "@/api/auth/types.ts";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Paperclip, PencilLine, SquareArrowOutUpRight, Trash2} from "lucide-react";
import AdminPanelEditForm from "@/pages/main/admin-panel-edit-form.tsx";
import {NavLink} from "react-router";
import FormFillUser from "@/pages/main/form-fill-user.tsx";
import {useAppDispatch} from "@/hooks.ts";
import {admin_deleteUserAC} from "@/store/admin/actionCreators.ts";

interface IAdminPanelItem {
    user: IDetailsResponse
}

const AdminPanelItem: FC<IAdminPanelItem> = ({user}) => {
    const dispatch = useAppDispatch();

    const [editUserState, setEditUserState] = useState(false);
    const [fillUserState, setFillUserState] = useState(false);

    const handleDeleteUser = () => {
        dispatch(admin_deleteUserAC(user.id));
    }

    return (
        <div>

            <AdminPanelEditForm state={editUserState} setState={setEditUserState} type={"edit"} user={user}/>
            <FormFillUser type={"admin"} state={fillUserState} setState={setFillUserState} user={user} />

            <div className={"flex gap-3"}>
                <div className={"w-[565px] bg-white flex p-3 rounded-lg box-border"}>
                    <div className={"flex flex-col gap-3 w-[400px]"}>
                        <div className={"flex gap-1"}>
                            <Label>{user.firstname}</Label>
                            <Label>{user.lastname}</Label>
                        </div>
                        <Label>shortname: @{user.shortname}</Label>
                        <Label>email: {user.email}</Label>
                        <Label>username: {user.username}</Label>
                    </div>
                    <div className={"flex flex-col gap-3 w-[200px]"}>
                        <Label>id: {user.id}</Label>
                        <Label>profileId: {user.profileId}</Label>
                        <Label>Роль: {user.role}</Label>
                        <Label>Верифицирован: {user.verified ? "Да" : "Нет"}</Label>
                    </div>
                </div>

                <div className={"w-[120px] bg-white flex justify-between items-start p-2 rounded-lg box-border"}>
                    <div className={"flex flex-col justify-between h-full"}>
                        <Button variant={"secondary"} onClick={() => {setEditUserState(true)}}>
                            <PencilLine/>
                        </Button>
                        <Button variant={"secondary"}>
                            <NavLink to={`/user/${user.shortname}`}>
                                <SquareArrowOutUpRight />
                            </NavLink>
                        </Button>
                    </div>
                    <div className={"flex flex-col justify-between h-full"}>
                        <Button variant={"secondary"} onClick={() => {setFillUserState(true)}}>
                            <Paperclip />
                        </Button>
                        <Button variant={"secondary"} onClick={handleDeleteUser}>
                            <Trash2/>
                        </Button>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default AdminPanelItem;