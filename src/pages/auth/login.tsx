import styles from "@/pages/auth/auth.module.css";
import {Label} from "@/components/ui/label.tsx";
import AuthInput from "@/pages/auth/auth-input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {loginAC} from "@/store/auth/actionCreators.ts";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import Loading from "@/components/ui/loading.tsx";
import {toast} from "sonner";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginError = useAppSelector(state => state.auth.authData.error);
    const isLoginLoading = useAppSelector(state => state.auth.authData.isLoading);

    useEffect(() => {
        setUsername("");
        setPassword("");
    }, [])

    const handleSubmit =  async () => {
        await dispatch(loginAC({username, password}));
        navigate("/my-page");
    };

    return (
        <div className={"bg-slate-50 w-full h-full flex items-center justify-center"}>

            <Loading dependence={isLoginLoading}/>

            <div className={styles.registerbox + " bg-white rounded-2xl flex flex-col gap-2.5"}>
                <div>
                    <Label className={"text-xl font-semibold text-slate-900"}>Войти</Label>
                </div>
                <div className={"flex flex-col gap-1.5"}>
                    <AuthInput title={"Имя пользователя"} placeholder={"Введите имя пользователя"} value={username} onChange={setUsername}/>
                    <AuthInput type={"password"} title={"Пароль"} placeholder={"Введите пароль"} value={password} onChange={setPassword}/>
                </div>
                <div className={"text-red-500"}>
                    {loginError}
                </div>
                <div>
                    <Button onClick={handleSubmit} className={"w-full h-10"}>Войти</Button>
                </div>
                <div>
                    Нет аккаунта? <NavLink className={"text-indigo-500"} to={"/auth/register"}>Создать аккаунт</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;