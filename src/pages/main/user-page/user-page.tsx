import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import PostItem from "@/new_components/postItem.tsx";
import {FC, ReactElement, useEffect, useRef, useState} from "react";
import {
    getAnotherPageAC, getMyFriendsAC,
    getMyPageAC,
    getMySubscriptionsAC,
    subscribeAC, unsubscribeAC
} from "@/store/profile/actionCreators.ts";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {IPost, IShortUser, IUserPage} from "@/types.ts";
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
import {IDetailsResponse} from "@/api/auth/types.ts";
import FormFillUser from "@/pages/main/form-fill-user.tsx";
import {useGetFriendsQuery, useGetProfileQuery, useGetSubscribersQuery} from "@/exp_api/profileApi.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface IUserPageProps {
    type: "my" | "another"
}


const UserPage: FC<IUserPageProps> = ({type}) => {
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    //new
    const user = type === "my" ? "mypage" : pathname.split("/").pop();

    const {data: pageData = [], isLoading: isProfileLoading} = useGetProfileQuery(user);
    const {data: subscribersData = [], isLoading: isSubscribersLoading} = useGetSubscribersQuery(user);
    const {data: friendsData = [], isLoading: isFriendsLoading} = useGetFriendsQuery(user);

    //let mySubscribers: IShortUser[] = [];
    //let myFriends: IShortUser[] = [];
    let mySubscriptions: IShortUser[] = [];


    const itemsCount = 4;

    const myThumbnail = useAppSelector(state => state.profile.myThumbnail);
    const details: IDetailsResponse = useAppSelector(state => state.auth.appInitializeData.initialUserData);

    const fullMySubscriptions =  useAppSelector(state => state.profile.mySubscriptions);
    const fullMyFriends =  useAppSelector(state => state.profile.myFriends);

    if (type === "my") {
        mySubscriptions = useAppSelector(state => state.profile.mySubscriptions.slice(0, itemsCount));
    } else {
        mySubscriptions = useAppSelector(state => state.profile.anotherSubscriptions.slice(0, itemsCount));
    }

    const [profileDetailsState, setProfileDetailsState] = useState(false);
    const [editProfileState, setEditProfileState] = useState(false);
    const [createPostState, setCreatePostState] = useState(false);
    const [updateAvatarState, setUpdateAvatarState] = useState(false);

    const [imagePreviewState, setImagePreviewState] = useState(false);
    const [currentImagePreview, setCurrentImagePreview] = useState("");

    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        setIsSubscribed(false);
    }, [pageData]);

    useEffect(() => {
        if (type === "my") {
            //if (!myPageData.shortName) dispatch(getMyPageAC());
        } else {
            //dispatch(getAnotherPageAC());
            if (fullMySubscriptions.length === 0) dispatch(getMySubscriptionsAC(details!.shortname));
            if (fullMyFriends.length === 0) dispatch(getMyFriendsAC(details!.shortname));
        }
    }, [type, pathname]);

    useEffect(() => {
        if (type === "another") {
            for (let i = 0; i < fullMySubscriptions.length; i++) {
                if (fullMySubscriptions[i].shortName === pageData.shortName) {
                    setIsSubscribed(true);
                    break;
                }
            }
            for (let i = 0; i < fullMyFriends.length; i++) {
                if (fullMyFriends[i].shortName === pageData.shortName) {
                    setIsSubscribed(true);
                    break;
                }
            }
        }

    }, [fullMySubscriptions, fullMyFriends, pathname, pageData]);

    const posts: ReactElement[] = pageData.userPosts && pageData.userPosts.map((post: IPost) =>
        <PostItem type={type} firstName={pageData.firstName} lastName={pageData.lastName}
                  shortName={pageData.shortName} postData={post} place={type === "my" ? "myPage" : "anotherPage"}/>
    );

    const subscribers: ReactElement[] = subscribersData.map((subscriber: IShortUser, index: number) => {
        if (index < itemsCount) return <ShortUserItem data={subscriber}/>
    });

    const friends: ReactElement[] = friendsData.map((friend: IShortUser, index: number) => {
        if (index < itemsCount) return <ShortUserItem data={friend}/>
    });

    const subscriptions: ReactElement[] = mySubscriptions.map((subscription: IShortUser, index: number) => {
        if (index < itemsCount) return <ShortUserItem data={subscription}/>
    });

    const formData = () => {
        const currentUser: IShortUser = {
            shortName: details.shortname,
            profileId: details.profileId!,
            lastName: details.lastname!,
            firstName: details.firstname!,
            thumbnail: myThumbnail!
        };

        const anotherUser: IShortUser = {
            shortName: pageData.shortName!,
            profileId: pageData.profileId!,
            lastName: pageData.lastName!,
            firstName: pageData.firstName!,
            thumbnail: pageData.image!
        };

        return {currentUser, anotherUser}
    }

    const handleSubscribe = () => {
        const data = formData();
        dispatch(subscribeAC(data.currentUser, data.anotherUser));
    }

    const handleUnsubscribe = () => {
        const data = formData();
        dispatch(unsubscribeAC(data.currentUser, data.anotherUser));
    }

    let options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timezone: 'UTC',
    };
    const formedDateOfBirth: string = pageData.dateOfBirth ? new Date(pageData.dateOfBirth).toLocaleString("ru", options) : "";

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
                                    <Label>{pageData.shortName}</Label>
                                </div>
                                {pageData.dateOfBirth
                                    && <div className={"flex gap-1 items-center"}>
                                        <Gift/>
                                        <Label>{"День рождения: " + formedDateOfBirth}</Label>
                                    </div>
                                }
                                {pageData.gender
                                    && <div className={"flex gap-1 items-center"}>
                                        <Ghost/>
                                        <Label>{"Пол: " + (pageData.gender === "male" ? "Мужской" : "Женский")}</Label>
                                    </div>
                                }
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <FormFillUser type={"user"} state={editProfileState} setState={setEditProfileState} pageData={pageData}/>

            <FormPost state={createPostState} setState={setCreatePostState} type={"add"}
                      profileId={pageData.profileId} thumbnail={myThumbnail} place={type === "my" ? "myPage" : "anotherPage"}/>

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
                                setCurrentImagePreview(pageData.image!);
                            }} src={pageData.image!}/>
                            <AvatarFallback className={"text-3xl"}>{(pageData.firstName && pageData.lastName)
                                && pageData.firstName[0] + pageData.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div className={"flex flex-col justify-center items-start h-full gap-2"}>
                            {isProfileLoading
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
                    <div className={"w-[600px] box-border flex flex-col gap-3"}>
                        {type === "my" && <div className={"rounded-lg w-full"}>
                            <Button className={"w-full h-[40px] rounded-lg"} onClick={() => {
                                setCreatePostState(true);
                            }}>Создать пост</Button>
                        </div>}
                        <div
                            className={"flex flex-col justify-center rounded-lg bg-white items-start p-3 gap-6 box-border"}>
                            {isProfileLoading
                                ? <Skeleton className={"w-full h-[450px]"}/>
                                : posts}
                        </div>
                    </div>

                    <div className={"sticky top-[96px] h-[520px] flex flex-col gap-3"}>
                        <div className={"w-[420px] rounded-lg bg-white box-border flex flex-col gap-3 p-3"}>
                            <div className={"flex flex-col gap-3"}>
                                {isSubscribersLoading
                                    ? <Skeleton className={"w-32 h-6"}/>
                                    : <ShortNameLink
                                        content={"Подписчики " + subscribersData.length} to={
                                        type === "my" ? "/my-friends/subscribers" : `/friends/subscribers/${pageData.shortName}`
                                    }/>
                                }

                                <div className={"flex justify-start items-start gap-1"}>
                                    {subscribers}
                                </div>
                            </div>
                            <div className={"flex flex-col gap-3"}>
                                {isFriendsLoading
                                    ? <Skeleton className={"w-32 h-6"}/>
                                    : <ShortNameLink content={"Друзья " + friendsData.length} to={
                                        type === "my" ? "/my-friends/friends" : `/friends/friends/${pageData.shortName}`
                                    }/>
                                }

                                <div className={"flex justify-start items-start gap-1"}>
                                    {friends}
                                </div>
                            </div>
                        </div>
                        <div className={"w-[420px] rounded-lg bg-white box-border flex flex-col gap-3 p-3"}>
                            <ShortNameLink content={"Подписки " + (subscriptions.length > Number(pageData.subscriptionsCount)
                                ? subscriptions.length : pageData.subscriptionsCount)} to={
                                type === "my" ? "/my-friends/subscriptions" : `/friends/subscriptions/${pageData.shortName}`
                            }/>
                            <div className={"flex justify-start items-start gap-1"}>
                                {subscriptions}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserPage;