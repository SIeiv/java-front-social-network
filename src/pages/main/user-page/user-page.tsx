import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import PostItem from "@/new_components/postItem.tsx";
import {FC, ReactElement, useEffect, useRef, useState} from "react";
import {
    getUserPageAC, getUserSubscribersAC, subscribeAC, unsubscribeAC,
} from "@/store/profile/actionCreators.ts";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {IShortUser} from "@/types.ts";
import {AtSign, Ghost, Gift, Info} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import ShortUserItem from "@/new_components/shortUserItem.tsx";
import {useLocation} from "react-router";
import ShortNameLink from "@/new_components/shortNameLink.tsx";
import FormPost from "@/pages/main/user-page/form-post.tsx";
import FormAvatar from "@/pages/main/user-page/form-avatar.tsx";
// import {IDetailsResponse} from "@/api/auth/types.ts";
import FormFillUser from "@/pages/main/form-fill-user.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import loadingCircles from "@/assets/bouncing-circles.svg";
import ShortUserSkeleton from "@/new_components/shortUserSkeleton.tsx";
import {IFullProfile} from "@/types/ProfileTypes.ts";
import LinkedUsers from "@/pages/main/user-page/linked-users.tsx";
import {resetProfile} from "@/store/profile/profile.slice.ts";
import UserPosts from "@/pages/main/user-page/user-posts.tsx";
import {IPost} from "@/types/PostTypes.ts";

interface IUserPageProps {
    type: "my" | "another"
}


const UserPage: FC<IUserPageProps> = ({type}) => {
    const dispatch = useAppDispatch();
    
    const itemsCount = 4;

    let pageData: IFullProfile = useAppSelector(state => state.profile.userPageData);
    let subscribers: IFullProfile[] = useAppSelector(state => state.profile.userSubscribers);
    let friends: IFullProfile[] = useAppSelector(state => state.profile.userFriends);
    let subscriptions: IFullProfile[] = useAppSelector(state => state.profile.userSubscriptions);
    let posts: IPost[] | null = useAppSelector(state => state.profile.userPosts);

    const {pathname} = useLocation();

    const isPageLoading = useAppSelector(state => state.loading.profile.pageLoading);
    const isSubscribersLoading = useAppSelector(state => state.loading.profile.subscribersLoading);
    const isFriendsLoading = useAppSelector(state => state.loading.profile.friendsLoading);
    const isSubscriptionsLoading = useAppSelector(state => state.loading.profile.subscriptionsLoading);

    const myAvatarPath = useAppSelector(state => state.profile.myAvatarPath);
    const me = useAppSelector(state => state.auth.appInitializeData.me);

    if (!me) return;

    const [profileDetailsState, setProfileDetailsState] = useState(false);
    const [editProfileState, setEditProfileState] = useState(false);
    const [updateAvatarState, setUpdateAvatarState] = useState(false);

    const [imagePreviewState, setImagePreviewState] = useState(false);
    const [currentImagePreview, setCurrentImagePreview] = useState("");

    const isSubscribedFunc = (subscribers: IFullProfile[], friends: IFullProfile[]) => {
        subscribers.forEach(subscriber => {
            if (subscriber.id === Number(me.profileId)) {
                setIsSubscribed(true);
                return;
            }
        })
        friends.forEach(subscriber => {
            if (subscriber.id === Number(me.profileId)) {
                setIsSubscribed(true);
                return;
            }
        })
    }

    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        setIsSubscribed(false);
        if (type === "another") {
            isSubscribedFunc(subscribers, friends);
        }
    }, [subscribers, friends, subscriptions, pathname]);

    useEffect(() => {
        dispatch(resetProfile());
        if (type === "my") {
            dispatch(getUserPageAC(Number(me.profileId)));
        } else {
            const id = Number(pathname.split("/").pop());
            dispatch(getUserPageAC(id));
        }
    }, [pathname]);

    /*useEffect(() => {
        if (type === "another") {
            for (let i = 0; i < subscriptions.length; i++) {
                if (subscriptions[i].shortName === pageData.shortName) {
                    setIsSubscribed(true);
                    break;
                }
            }
            for (let i = 0; i < friends.length; i++) {
                if (friends[i].shortName === pageData.shortName) {
                    setIsSubscribed(true);
                    break;
                }
            }
        }

    }, [subscriptions, friends, pathname, pageData]);*/

    const formData = () => {
        const currentUser: IShortUser = {
            shortName: pageData.shortName,
            profileId: pageData.id,
            lastName: pageData.lastName,
            firstName: pageData.firstName,
            thumbnail: myAvatarPath!
        };

        /*const anotherUser: IShortUser = {
            shortName: pageData.shortName!,
            profileId: pageData.profileId!,
            lastName: pageData.lastName!,
            firstName: pageData.firstName!,
            thumbnail: pageData.image!
        };*/



        return {currentUser, object};
    }

    const handleSubscribe = () => {
        dispatch(subscribeAC(pageData.id));
        setIsSubscribed(true);
    }

    const handleUnsubscribe = () => {
        dispatch(unsubscribeAC(pageData.id));
        setIsSubscribed(false);
    }

    let options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timezone: 'UTC',
    };
    const formedDateOfBirth: string = pageData.birthday ? new Date(pageData.birthday).toLocaleString("ru", options) : "";

    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <div>
            <Dialog open={profileDetailsState} onOpenChange={() => setProfileDetailsState(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Подробная информация</DialogTitle>
                        <DialogDescription>
                            <div className={"flex flex-col gap-3 mt-3"}>
                                <div className={"flex gap-1 items-center"}>
                                    <AtSign/>
                                    {
                                        isPageLoading
                                            ? <Skeleton className={"w-32 h-6"}/>
                                            : <Label>{pageData.shortName}</Label>
                                    }

                                </div>
                                {pageData.birthday
                                    && <div className={"flex gap-1 items-center"}>
                                        <Gift/>
                                        {
                                            isPageLoading
                                                ? <Skeleton className={"w-32 h-6"}/>
                                                : <Label>{"День рождения: " + formedDateOfBirth}</Label>
                                        }

                                    </div>
                                }
                                {pageData.gender
                                    && <div className={"flex gap-1 items-center"}>
                                        <Ghost/>
                                        {
                                            isPageLoading
                                                ? <Skeleton className={"w-32 h-6"}/>
                                                : <Label>{"Пол: " + (pageData.gender === "male" ? "Мужской" : "Женский")}</Label>
                                        }
                                    </div>
                                }
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <FormFillUser type={"user"} state={editProfileState} setState={setEditProfileState} pageData={pageData}/>

            <Dialog open={imagePreviewState} onOpenChange={() => setImagePreviewState(false)}>
                <DialogContent className={`p-0 max-h-[80vh]`}>
                    <img ref={imgRef} className={"rounded-lg max-h-[80vh]"} src={currentImagePreview} alt=""/>
                </DialogContent>
            </Dialog>

            <FormAvatar state={updateAvatarState} setState={setUpdateAvatarState}/>

            <div className={"w-fill flex flex-col gap-3"}>

                {/*основная инфа о юзере*/}
                <div
                    className={"h-[150px] w-[1032px] bg-white rounded-lg box-border p-3 flex justify-between items-center"}>
                    <div className={"h-full flex gap-3"}>
                        <Avatar className={"w-32 h-32"}>
                            <AvatarImage onClick={() => {
                                setImagePreviewState(true);
                                setCurrentImagePreview(pageData.avatarPath!);
                            }} src={pageData.avatarPath!}/>
                            <AvatarFallback className={"text-3xl"}>{(pageData.firstName && pageData.lastName)
                                && pageData.firstName[0] + pageData.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div className={"flex flex-col justify-center items-start h-full gap-2"}>
                            {isPageLoading
                                ? <Skeleton className={"w-32 h-6"}/>
                                : <Label className={"text-base"}>{pageData.firstName + " " + pageData.lastName}</Label>
                            }
                            <Label onClick={() => {
                                setProfileDetailsState(true)
                            }} className={"hover:underline cursor-pointer flex items-center justify-center gap-1"}>
                                <Info size={20}/>
                                Подробнее
                            </Label>
                        </div>
                    </div>
                    <div>
                        {type === "my"
                            ? <div className={"flex gap-2"}>
                                <Button variant={"secondary"} onClick={() => {
                                    setUpdateAvatarState(true);
                                }}>Изменить аватарку</Button>
                                <Button variant={"secondary"} onClick={() => {
                                    setEditProfileState(true)
                                }}>Редактировать профиль</Button>
                            </div>
                            : <div className={"flex gap-1.5"}>
                                {isSubscribed
                                    ? <Button onClick={handleUnsubscribe} variant={"ghost"}>Отписаться</Button>
                                    : <Button onClick={handleSubscribe}>Подписаться</Button>}
                            </div>
                        }

                    </div>
                </div>

                {/*посты и подпещики*/}
                <div className={"w-full flex gap-3"}>

                    {/*посты*/}
                    <UserPosts type={type} loading={isPageLoading} posts={posts} profile={pageData}/>

                    <div className={"sticky top-[96px] h-[520px] flex flex-col gap-3"}>
                        <div className={"w-[420px] rounded-lg bg-white box-border flex flex-col gap-3 p-3"}>
                            <LinkedUsers loading={isSubscribersLoading || isPageLoading} title={"Подписчики"} link={"subscribers"}
                                         linkedUsers={subscribers} type={type} pageData={pageData} itemsCount={itemsCount}/>

                            <LinkedUsers loading={isFriendsLoading || isPageLoading} title={"Друзья"} link={"friends"}
                                         linkedUsers={friends} type={type} pageData={pageData} itemsCount={itemsCount}/>
                        </div>
                        <div className={"w-[420px] rounded-lg bg-white box-border flex flex-col gap-3 p-3"}>
                            <LinkedUsers loading={isSubscriptionsLoading || isPageLoading} title={"Подписки"} link={"subscriptions"}
                                         linkedUsers={subscriptions} type={type} pageData={pageData} itemsCount={itemsCount}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserPage;