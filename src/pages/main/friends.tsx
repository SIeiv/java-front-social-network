import {NavLink, useLocation} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {FC, ReactElement, useEffect} from "react";
import {Label} from "@/components/ui/label.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import FriendItem from "@/new_components/friendItem.tsx";
import ShortNameLink from "@/new_components/shortNameLink.tsx";
import loadingCircles from "@/assets/bouncing-circles.svg";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {IFullProfile} from "@/types/ProfileTypes.ts";
import {getUserPageAC} from "@/store/profile/actionCreators.ts";

interface IFriendsProps {
    type: "my" | "another";
    category: "friends" | "subscribers" | "subscriptions";
}

const Friends: FC<IFriendsProps> = ({type, category}) => {
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    const pathnameEnd = pathname.split("/").pop();

    const me = useAppSelector(state => state.auth.appInitializeData.me)

    const isSubscribersLoading = useAppSelector(state => state.loading.profile.subscribersLoading);
    const isFriendsLoading = useAppSelector(state => state.loading.profile.friendsLoading);
    const isSubscriptionsLoading = useAppSelector(state => state.loading.profile.subscriptionsLoading);

    let content: IFullProfile[] = []
    let profile: IFullProfile = useAppSelector(state => state.profile.userPageData);

    if (category === "friends")
        content = useAppSelector(state => state.profile.userFriends);
    else if (category === "subscribers")
        content = useAppSelector(state => state.profile.userSubscribers);
    else if (category === "subscriptions")
        content = useAppSelector(state => state.profile.userSubscriptions);

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
            dispatch(getUserPageAC(Number(me.profileId)));
        } else if (type === "another") {
            dispatch(getUserPageAC(Number(pathnameEnd)));
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
                    <div>
                        {isSubscribersLoading || isFriendsLoading || isSubscriptionsLoading
                            ? <Skeleton className={"w-32 h-5"}/>
                            : <div className={"flex gap-1"}>
                                <Label>{titleController() + " " + (content.length) + " "}</Label>
                                {type === "another" &&
                                    <ShortNameLink content={`(@${profile.firstName} ${profile.lastName})`} to={`/user/${profile.id}`}/>}
                            </div>
                        }

                    </div>

                    <div className={"flex flex-col gap-4 w-full"}>
                        {isSubscribersLoading || isFriendsLoading || isSubscriptionsLoading
                            ? <img src={loadingCircles} alt="" className={"w-16 h-16 m-auto"}/>
                            : contentItems
                        }
                    </div>
                </div>
            </div>

            <div className={"flex flex-col gap-3 sticky top-[96px] h-[164px]"}>
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
