import logo from "../assets/react.svg";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {Button} from "@/components/ui/button.tsx";
import {CircleUserRound} from "lucide-react";
import {NavLink} from "react-router";
import {logoutUser} from "@/store/auth/actionCreators.ts";

const Header = () => {
    const profile = useAppSelector(state => state.auth.profileData.profile);
    const avatar = useAppSelector(state => state.auth.avatarData.avatar);

    const dispatch = useAppDispatch();

    return (
        <div className={"w-full h-20 bg-white sticky top-0 z-20"}>
            <div className={"w-[1248px] h-full m-auto flex items-center justify-between"}>
                <NavLink to={"/"}>
                    <img src={logo} alt=""/>
                </NavLink>
                <Button onClick={() => {dispatch(logoutUser())}}>Выйти</Button>
                {profile
                    ? <Button variant={"ghost"} className={"h-15"}>
                        <NavLink to={"/lk/fav"}>
                            <div className={"flex items-center gap-3"}>
                                <span>{profile.username}</span>
                                <Avatar>
                                    <AvatarImage src={avatar}/>
                                    <AvatarFallback>{profile ? profile.username[0] : "U"}</AvatarFallback>
                                </Avatar>
                            </div>
                        </NavLink>
                    </Button>

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