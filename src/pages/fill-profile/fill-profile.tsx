import styles from "@/pages/auth/auth.module.css";
import {Label} from "@/components/ui/label.tsx";
import AuthInput from "@/pages/auth/auth-input.tsx";
import {Button} from "@/components/ui/button.tsx";
import FillProfileGender from "@/pages/fill-profile/fill-profile-gender.tsx";
import {useAppDispatch} from "@/hooks.ts";
import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";
import {useEffect, useState} from "react";
import {fillProfileAC} from "@/store/profile/actionCreators.ts";
import {IFillProfileRequest} from "@/api/profile/types.ts";


const FillProfile = () => {
    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [shortName, setShortName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState(0);

    const handleSubmit = () => {
        const data: IFillProfileRequest = {
            firstName,
            lastName,
            shortName,
            birthDate,
            gender: gender ? "female" : "male",
            avatar: ""
        }

        dispatch(fillProfileAC(data));
    }

    const [alertState, setAlertState] = useState(false);

    useEffect(() => {
        //setAlertState(true);
    }, [])

    return (
        <div className={"bg-slate-50 w-full h-full flex items-center justify-center"}>

            <AlertDialog open={alertState}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Заполните профиль</AlertDialogTitle>
                        <AlertDialogDescription>
                            Перед началом работы вам необходимо заполнить основную информацию о себе.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {setAlertState(false)}}>Ок</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className={styles.registerbox + " bg-white rounded-2xl flex flex-col gap-2.5"}>
                <div>
                    <Label className={"text-xl font-semibold text-slate-900"}>Заполнить профиль</Label>
                </div>

                <div className={"flex flex-col gap-1.5"}>
                    <AuthInput title={"Ваше имя"} placeholder={"Введите имя"} value={firstName} onChange={setFirstName}/>
                    <AuthInput title={"Ваша фамилия"} placeholder={"Введите фамилию"} value={lastName} onChange={setLastName}/>
                    <AuthInput title={"Никнейм"} placeholder={"Введите никнейм"} value={shortName} onChange={setShortName}/>
                    <AuthInput title={"Дата рождения"} placeholder={"2000-03-28"} value={birthDate} onChange={setBirthDate}/>
                    <div className={"flex justify-start"}>
                        <FillProfileGender items={["Мужской", "Женский"]} activeButton={gender} setActiveButton={setGender}/>
                    </div>
                </div>

                <div className={"text-red-500"}>

                </div>
                <div>
                    <Button className={"w-full h-10"} onClick={handleSubmit}>Заполнить</Button>
                </div>

            </div>
        </div>
    );
};

export default FillProfile;