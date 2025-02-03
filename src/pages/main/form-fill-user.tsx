import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import AuthInput from "@/pages/auth/auth-input.tsx";
import FillProfileGender from "@/pages/fill-profile/fill-profile-gender.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FC, useState} from "react";
import {fillProfile2AC} from "@/store/profile/actionCreators.ts";
import {useAppDispatch} from "@/hooks.ts";
import {IUserPage} from "@/types.ts";
import {admin_fillUserAC} from "@/store/admin/actionCreators.ts";
import {IFillUserRequest} from "@/api/admin/types.ts";
import {IDetailsResponse} from "@/api/auth/types.ts";

interface IFormFillUser {
    type: "user" | "admin";
    state: boolean;
    setState: (state: boolean) => void;
    pageData?: IUserPage
    user?: IDetailsResponse;
}

const FormFillUser: FC<IFormFillUser> = ({type, state, setState, pageData, user}) => {
    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState(type === "user" ? pageData!.firstName! : (user ? user.firstname : ""));
    const [lastName, setLastName] = useState(type === "user" ? pageData!.lastName! : (user ? user.lastname : ""));
    const [shortName, setShortName] = useState(type === "user" ? pageData!.shortName! : (user ? user.shortname : ""));
    const [birthDate, setBirthDate] = useState(type === "user" ? pageData!.dateOfBirth! : "");
    const [gender, setGender] = useState(type === "user" ? (pageData!.gender! === "male" ? 0 : 1) : 0);

    //const [error, setError] = useState();

    const handleFillProfileSubmit = () => {
        const data = {
            firstName,
            lastName,
            shortName,
            birthDate,
            gender: gender ? "female" : "male",
            avatar: ""
        }

        dispatch(fillProfile2AC(data));
        setState(false);
    }

    const handleFillAdminSubmit = () => {
        const data: IFillUserRequest = {
            id: user?.profileId!,
            firstName,
            lastName,
            shortName,
            birthDate,
            gender: gender ? "female" : "male",
        }

        dispatch(admin_fillUserAC(data));
        setState(false);
    }

    return (
        <Dialog open={state} onOpenChange={() => setState(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать профиль</DialogTitle>
                    <DialogDescription>
                        <div className={"flex flex-col gap-3 mt-3"}>
                            <div className={"flex flex-col gap-1.5"}>
                                <AuthInput title={"Ваше имя"} placeholder={"Введите имя"} value={firstName}
                                           onChange={setFirstName}/>
                                <AuthInput title={"Ваша фамилия"} placeholder={"Введите фамилию"}
                                           value={lastName}
                                           onChange={setLastName}/>
                                <AuthInput title={"Никнейм"} placeholder={"Введите никнейм"} value={shortName}
                                           onChange={setShortName}/>
                                <AuthInput title={"Дата рождения"} placeholder={"2000-03-28"} value={birthDate}
                                           onChange={setBirthDate}/>
                                <div className={"flex justify-start"}>
                                    <FillProfileGender items={["Мужской", "Женский"]} activeButton={gender}
                                                       setActiveButton={setGender}/>
                                </div>
                            </div>

                            <div className={"text-red-500"}>

                            </div>
                        </div>

                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={type === "admin" ? handleFillAdminSubmit : handleFillProfileSubmit}>Применить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FormFillUser;