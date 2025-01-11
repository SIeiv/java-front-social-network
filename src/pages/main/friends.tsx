import {NavLink, useLocation} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {FC, ReactElement, useEffect} from "react";
import {Label} from "@/components/ui/label.tsx";
import {
    getAnotherFriendsAC,
    getAnotherSubscribersAC, getAnotherSubscriptionsAC,
    getMyFriendsAC,
    getMySubscribersAC,
    getMySubscriptionsAC
} from "@/store/profile/actionCreators.ts";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {IShortUser} from "@/types.ts";
import FriendItem from "@/new_components/friendItem.tsx";
import ShortNameLink from "@/new_components/shortNameLink.tsx";

interface IFriendsProps {
    type: "my" | "another";
    category: "friends" | "subscribers" | "subscriptions";
}

const Friends: FC<IFriendsProps> = ({type, category}) => {
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    const pathnameEnd = pathname.split("/").pop();

    const user = useAppSelector(state => state.auth.appInitializeData.initialUserData)

    let content: IShortUser[] = []

    if (type === "my") {
        if (category === "friends")
            content = useAppSelector(state => state.profile.myFriends);
        else if (category === "subscribers")
            content = useAppSelector(state => state.profile.mySubscribers);
        else if (category === "subscriptions")
            content = useAppSelector(state => state.profile.mySubscriptions);
    } else if (type === "another") {
        if (category === "friends")
            content = useAppSelector(state => state.profile.anotherFriends);
        else if (category === "subscribers")
            content = useAppSelector(state => state.profile.anotherSubscribers);
        else if (category === "subscriptions")
            content = useAppSelector(state => state.profile.anotherSubscriptions);
    }

    const titleController = () => {
        if (category === "friends") {
            return "Друзья"
        } else if (category === "subscribers") {
            return "Подписчики"
        } else if (category === "subscriptions") {
            return "Подписки"
        }
    }

    const navPathController = (route: string) => {
        if (type === "my") return `/my-friends/${route}`;
        else if (type === "another") return `/friends/${route}/${pathnameEnd}`
        else return ""
    }


    useEffect(() => {
        if (type === "my") {
            if (category === "friends") user && typeof user !== "number" && dispatch(getMyFriendsAC(user.shortname));
            else if (category === "subscribers") user && typeof user !== "number" && dispatch(getMySubscribersAC(user.shortname));
            else if (category === "subscriptions") user && typeof user !== "number" && dispatch(getMySubscriptionsAC(user.shortname));
        } else if (type === "another") {
            if (category === "friends") pathnameEnd && dispatch(getAnotherFriendsAC(pathnameEnd));
            else if (category === "subscribers") pathnameEnd && dispatch(getAnotherSubscribersAC(pathnameEnd));
            else if (category === "subscriptions") pathnameEnd && dispatch(getAnotherSubscriptionsAC(pathnameEnd));
        }

    }, [type, category, pathname]);

    const contentItems: ReactElement[] = content.map(item =>
        <FriendItem friendData={item}/>
    )

    return (
        <div className={"flex gap-3"}>
            <div className={"w-[600px] box-border flex flex-col gap-3"}>

                <div
                    className={"flex flex-col justify-center rounded-lg bg-white items-start p-3 gap-6 box-border"}>
                    <div className={"flex gap-1"}>
                        <Label>{titleController() + " " + (content.length) + " "}</Label>
                        {type === "another" && <ShortNameLink content={`(@${pathnameEnd})`} to={`/user/${pathnameEnd}`}/>}
                    </div>

                    <div className={"flex flex-col gap-4"}>
                        {contentItems}
                    </div>
                </div>
            </div>

            <div className={"flex flex-col gap-3"}>
                <div className={"w-[420px] rounded-lg bg-white box-border flex flex-col p-3 gap-1"}>
                    <NavLink to={navPathController("friends")} className={({isActive,}) =>
                        isActive ? "bg-accent rounded-md" : ""}>
                        <Button variant={"ghost"} className={"justify-start h-11 w-full"}>Друзья</Button>
                    </NavLink>
                    <NavLink to={navPathController("subscribers")} className={({isActive,}) =>
                        isActive ? "bg-accent rounded-md" : ""}>
                        <Button variant={"ghost"} className={"justify-start h-11 w-full"}>Подписчики</Button>
                    </NavLink>
                    <NavLink to={navPathController("subscriptions")} className={({isActive,}) =>
                        isActive ? "bg-accent rounded-md" : ""}>
                        <Button variant={"ghost"} className={"justify-start h-11 w-full"}>Подписки</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Friends;
