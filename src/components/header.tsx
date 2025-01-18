import logo from "../assets/react.svg";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {Button} from "@/components/ui/button.tsx";
import {CircleUserRound, LogOut, Search} from "lucide-react";
import {NavLink, useNavigate} from "react-router";
import {logoutUser} from "@/store/auth/actionCreators.ts";
import {Label} from "@/components/ui/label.tsx";
import {useEffect, useRef, useState} from "react";
import {getMyThumbnailAC} from "@/store/profile/actionCreators.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {IDetailsResponse} from "@/api/auth/types.ts";
import {resetAll} from "@/store/commonAC.ts";
import {Input} from "@/components/ui/input.tsx";
import {setField} from "@/store/search/search.slice.ts";
import {searchAC} from "@/store/search/actionCreators.ts";
import SearchItem from "@/new_components/searchItem.tsx";

const Header = () => {
    const profile: IDetailsResponse = useAppSelector(state => state.auth.appInitializeData.initialUserData);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const myThumbnail = useAppSelector(state => state.profile.myThumbnail);
    const searchData = useAppSelector(state => state.search.searchData.slice(0, 4));

    const [searchInput, setSearchInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const [isEnterPressed, setIsEnterPressed] = useState(false);

    useEffect(() => {
        if (!myThumbnail) dispatch(getMyThumbnailAC());
    });

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(resetAll());
        navigate("/auth/login");

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchInput !== "") {
            setIsEnterPressed(true);
            dispatch(searchAC({search: searchInput}));
        }
    }

    const searchEls = searchData.map((item) => <SearchItem key={item.profileId} data={item} onClick={
        () => {
            setSearchInput("");
            setIsEnterPressed(false);
        }
    }/>)

    return (
        <div className={"w-full h-20 bg-white sticky top-0 z-20"}>
            <div className={"w-[1248px] h-full m-auto flex items-center justify-between"}>
                <div className={"flex gap-4"}>
                    <div className={"w-[200px]"}>
                        <NavLink to={"/"}>
                            <img src={logo} alt=""/>
                        </NavLink>
                    </div>
                    <div className={"relative"}>
                        <div className={"flex gap-2 items-center"}>
                            <Search/>
                            <Input ref={inputRef} placeholder={"Поиск"} value={searchInput}
                                   className={"w-64 border-input " + ((searchInput !== "") ? "rounded-b-none" : "")}
                                   onChange={(e) => {
                                       setSearchInput(e.target.value);
                                   }} onKeyDown={handleKeyDown}></Input>
                        </div>
                        {(searchInput !== "" && isEnterPressed)
                            && <div className={"absolute left-8 w-64 bg-white border border-black "}>
                            <NavLink to={`/search/${searchInput}`}>
                                <Button className={"w-full"} variant={"ghost"}
                                        onClick={() => {
                                            dispatch(setField(searchInput));
                                            setSearchInput("");
                                        }}>Показать все результаты</Button>
                            </NavLink>
                                {searchEls}
                        </div>}
                    </div>
                </div>
                {profile
                    ? <div className={"flex gap-3 items-center"}>
                        {profile.role === "ROLE_MODERATOR"
                            && <Label className={"bg-green-600 text-white px-2 py-1 rounded-md"}>Модератор</Label>}
                        {profile.role === "ROLE_ADMIN"
                            && <Label className={"bg-red-600 text-white p-2 py-1 rounded-md"}>Админ</Label>}
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant={"ghost"} className={"h-15"}>
                                    <Avatar className={""}>
                                        <AvatarImage src={myThumbnail}/>
                                        <AvatarFallback>{(profile.firstname && profile.lastname)
                                            && profile.firstname[0] + profile.lastname[0]}</AvatarFallback>
                                    </Avatar>
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
                    </div>

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