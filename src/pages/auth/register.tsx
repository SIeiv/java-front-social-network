import styles from "@/pages/auth/auth.module.css";
import {Label} from "@/components/ui/label.tsx";
import AuthInput from "@/pages/auth/auth-input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink, useNavigate} from "react-router";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {registerUser} from "@/store/auth/actionCreators.ts";
import {useAppSelector} from "@/hooks.ts";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Loading from "@/components/ui/loading.tsx";
import {setRegisterError} from "@/store/auth/auth.slice.ts";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerError = useAppSelector(state => state.auth.regData.error);
    const isRegisterLoading = useAppSelector(state => state.auth.regData.isLoading);

    const verifyPasswordRef = useRef<HTMLInputElement>(null)

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [registerSuccessForm, setRegisterSuccessForm] = useState(false);
    const [isRegistered, setIsRegister] = useState(false)

    const handleSubmit = async () => {
        if (password === passwordVerify) {
            await dispatch(registerUser({email, password, username}));
            setIsRegister(true);
        } else {
            dispatch(setRegisterError("Введеные пароли должны совпадать"));
            verifyPasswordRef.current!.style.borderColor = "red"
        }
    };

    useEffect(() => {
        if (!registerError && isRegistered) {
            setRegisterSuccessForm(true);
            setUsername("");
            setEmail("");
            setPassword("");
            setPasswordVerify("");
        }
    }, [isRegisterLoading, isRegistered]);

    return (
        <div className={"bg-slate-50 w-full h-full flex items-center justify-center"}>

            <Loading dependence={isRegisterLoading}/>

            <AlertDialog open={registerSuccessForm}>
                <AlertDialogTrigger></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle></AlertDialogTitle>
                        <AlertDialogDescription>
                            Регистрация прошла успешно. Перейти на страницу входа?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {
                            setRegisterSuccessForm(false);
                            setIsRegister(false);
                        }}>Нет</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            navigate("/auth/login");
                        }}>Да</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className={styles.registerbox + " bg-white rounded-2xl flex flex-col gap-2.5"}>
                <div>
                    <Label className={"text-xl font-semibold text-slate-900"}>Создать аккаунт</Label>
                </div>
                <div className={"flex flex-col items-start gap-1.5"}>
                    <AuthInput title={"Имя пользователя"} placeholder={"Введите имя пользователя"} value={username}
                               onChange={setUsername}/>
                    <AuthInput title={"Почта"} placeholder={"Введите почту"} value={email} onChange={setEmail}/>
                    <AuthInput type={"password"} title={"Пароль"} placeholder={"Введите пароль"} value={password} onChange={setPassword}/>
                    <AuthInput type={"password"} title={"Повторите пароль"} ref={verifyPasswordRef} value={passwordVerify} onChange={setPasswordVerify} placeholder={"Повторите пароль"}/>
                </div>
                <div className={"text-red-500"}>
                    {registerError}
                </div>
                <div>
                    <Button onClick={handleSubmit} className={"w-full h-10"}>Создать аккаунт</Button>
                </div>
                <div>
                    Уже есть аккаунт? <NavLink className={"text-indigo-500"} to={"/auth/login"}>Войти</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Register;