import {FC, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import AuthInput from "@/pages/auth/auth-input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {ComboboxDemo} from "@/components/ui/combobox-demo.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IEditUserRequest} from "@/api/admin/types.ts";
import {admin_addUserAC, admin_editUserAC} from "@/store/admin/actionCreators.ts";
import {UserRolesType} from "@/types.ts";
import {IDetailsResponse} from "@/api/auth/types.ts";
import {useAppDispatch} from "@/hooks.ts";

interface Props {
    state: boolean;
    setState: (state: boolean) => void;
    type: "add" | "edit";
    user?: IDetailsResponse
}

const AdminPanelEditForm: FC<Props> = ({state, setState, type, user}) => {
    const dispatch = useAppDispatch();

    const formData = () => {
        const data: IEditUserRequest = {
            username,
            password,
            email,
            role: editRole,
            id: user!.id
        }
        return data;
    }

    const handleEditUserSubmit = () => {
        const data: IEditUserRequest = formData();

        dispatch(admin_editUserAC(data, user!.id));
        setState(false);
    }

    const handleAddUserSubmit = () => {
        const data: IEditUserRequest = formData();

        dispatch(admin_addUserAC(data));
        setState(false);

        setEmail("");
        setUsername("");
        setPassword("");
        setEditRole("ROLE_USER");
    }

    const [email, setEmail] = useState(type === "add" ? "" : user!.email);
    const [username, setUsername] = useState(type === "add" ? "" : user!.username);
    const [password, setPassword] = useState("");
    const [editRole, setEditRole] = useState<UserRolesType>(type === "add" ? "ROLE_USER" : user!.role);

    return (
        <Dialog open={state} onOpenChange={() => setState(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{type === "add" ? "Добавить" : "Редактировать"} пользователя</DialogTitle>
                    <DialogDescription>
                        <div className={"flex flex-col gap-3 mt-3"}>
                            <div className={"flex flex-col gap-1.5"}>
                                <AuthInput title={"Email"} placeholder={"Введите email"} value={email}
                                           onChange={setEmail}/>
                                <AuthInput title={"Username"} placeholder={"Введите username"}
                                           value={username}
                                           onChange={setUsername}/>
                                <AuthInput title={"Пароль"} placeholder={"Введите пароль"} value={password}
                                           onChange={setPassword}/>
                                <div className={"flex flex-col gap-2"}>
                                    <Label>Роль</Label>
                                    <ComboboxDemo role={editRole} setEditRole={setEditRole}/>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={type === "add" ? handleAddUserSubmit : handleEditUserSubmit}>Применить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AdminPanelEditForm;