import logo from "../assets/react.svg";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {Button} from "@/components/ui/button.tsx";
import {CircleUserRound, LogOut} from "lucide-react";
import {NavLink, useNavigate} from "react-router";
import {logoutUser} from "@/store/auth/actionCreators.ts";
import {Label} from "@/components/ui/label.tsx";
import {useEffect} from "react";
import {getMyThumbnailAC} from "@/store/profile/actionCreators.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {IDetailsResponse} from "@/api/auth/types.ts";
import {logout} from "@/api/auth";
import {resetAll} from "@/store/commonAC.ts";

const Header = () => {
    const profile: IDetailsResponse = useAppSelector(state => state.auth.appInitializeData.initialUserData);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const myThumbnail = useAppSelector(state => state.profile.myThumbnail);

    useEffect(() => {
        if (!myThumbnail) dispatch(getMyThumbnailAC());
    });

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(resetAll());
        navigate("/auth/login");

    }

    return (
        <div className={"w-full h-20 bg-white sticky top-0 z-20"}>
            <div className={"w-[1248px] h-full m-auto flex items-center justify-between"}>
                <NavLink to={"/"}>
                    <img src={logo} alt=""/>
                </NavLink>
                {profile
                    ? <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant={"ghost"} className={"h-15"}>
                            {myThumbnail && <img src={myThumbnail} alt="" className={"w-10 h-10 rounded-full"}/>}
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className={"flex items-center justify-center"}>
                                <div className={"flex flex-col items-center justify-center gap-2"}>
                                    {/*<Avatar className="w-16 h-16">
                                        <AvatarImage src={myThumbnail ? myThumbnail : ""} />
                                        <AvatarFallback>AV</AvatarFallback>
                                    </Avatar>*/}
                                    <div className={"flex flex-col items-center justify-center"}>
                                        <Label>{profile.firstname + " " + profile.lastname}</Label>
                                        <Label className={"text-slate-500"}>{profile.email}</Label>
                                    </div>

                                </div>

                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className={"cursor-pointer"} onClick={handleLogout}>
                                <LogOut />
                                Выйти
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    :
                    <NavLink to={"/auth/login"}>
                        <Button>
                            <CircleUserRound/>
                            <span>Войти</span>
                        </Button>
                    </NavLink>

                }

            </div>
        </div>
    );
};

export default Header;