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
import {FC, useEffect, useState} from "react";
//import {fillProfile2AC} from "@/store/profile/actionCreators.ts";
import {useAppDispatch} from "@/hooks.ts";
import {IFullProfile} from "@/types/ProfileTypes.ts";
import {updateUserPageAC} from "@/store/profile/actionCreators.ts";
import {IUpdateProfileRequest} from "@/api/profile/types.ts";

interface IFormFillUser {
    type: "user" | "admin";
    state: boolean;
    setState: (state: boolean) => void;
    pageData: IFullProfile
    user?: any;
}

const FormFillUser: FC<IFormFillUser> = ({type, state, setState, pageData, user}) => {
    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [shortName, setShortName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState(0);

    useEffect(() => {
        setFirstName(type === "user" ? pageData!.firstName : (user ? user.firstname : ""));
        setLastName(type === "user" ? pageData!.lastName : (user ? user.lastname : ""));
        setShortName(type === "user" ? pageData!.shortName : (user ? user.shortname : ""));
        setBirthDate((type === "user" && pageData.birthday) ? pageData!.birthday.split("T")[0] : "");
        setGender(type === "user" ? (pageData!.gender! === "male" ? 0 : 1) : 0);
    }, [pageData, user])

    const handleFillProfileSubmit = () => {
        const data: IUpdateProfileRequest = {
            FirstName: firstName,
            LastName: lastName,
            ShortName: shortName,
            Birthday: new Date(birthDate).toISOString(),
            Gender: gender ? "female" : "male",
        }

        dispatch(updateUserPageAC(data));
        setState(false);
    }

    const handleFillAdminSubmit = () => {
        const data: any = {
            id: user?.profileId!,
            firstName,
            lastName,
            shortName,
            birthDate,
            gender: gender ? "female" : "male",
        }

        //dispatch(admin_fillUserAC(data));
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