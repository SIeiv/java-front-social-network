import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import PostItem from "@/new_components/postItem.tsx";
import {FC, ReactElement, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {createPostAC, fillProfile2AC, getAnotherPageAC, getMyPageAC} from "@/store/profile/actionCreators.ts";
import {useAppSelector} from "@/hooks.ts";
import {IPost, IShortUser, IUserPage} from "@/types.ts";
import {AtSign, Ghost, Gift, Info} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import ShortUserItem from "@/new_components/shortUserItem.tsx";
import AuthInput from "@/pages/auth/auth-input.tsx";
import FillProfileGender from "@/pages/fill-profile/fill-profile-gender.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ICreatePostRequest} from "@/api/posts/types.ts";
import {useLocation} from "react-router";
import {clearAnotherUser} from "@/store/profile/profile.slice.ts";

interface IUserPageProps {
    type: "my" | "another"
}


const UserPage: FC<IUserPageProps> = ({type}) => {
    const dispatch = useDispatch();

    let myPageData: IUserPage;
    let mySubscribers: IShortUser[] = [];
    let myFriends: IShortUser[] = [];
    let mySubscriptions: IShortUser[] = [];

    const {pathname} = useLocation();

    const itemsCount = 4;

    if (type === "my") {
        myPageData = useAppSelector(state => state.profile.myPageData);
        mySubscribers = useAppSelector(state => state.profile.mySubscribers.slice(0, itemsCount));
        myFriends = useAppSelector(state => state.profile.myFriends.slice(0, itemsCount));
        mySubscriptions = useAppSelector(state => state.profile.mySubscriptions.slice(0, itemsCount));
    } else {
        myPageData = useAppSelector(state => state.profile.anotherPageData);
        mySubscribers = useAppSelector(state => state.profile.anotherSubscribers.slice(0, itemsCount));
        myFriends = useAppSelector(state => state.profile.anotherFriends.slice(0, itemsCount));
        mySubscriptions = useAppSelector(state => state.profile.anotherSubscriptions.slice(0, itemsCount));
    }

    const [profileDetailsState, setProfileDetailsState] = useState(false);
    const [editProfileState, setEditProfileState] = useState(false);
    const [createPostState, setCreatePostState] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [shortName, setShortName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState(0);

    const [addPostContent, setAddPostContent] = useState("");

    const [imagePreviewState, setImagePreviewState] = useState(false);
    const [currentImagePreview, setCurrentImagePreview] = useState("");

    useEffect(() => {
        if (type === "my") {
            if (!myPageData.shortName) dispatch(getMyPageAC());
        } else {
            dispatch(getAnotherPageAC());
        }
    }, [type, pathname]);

    useEffect(() => {
        setFirstName(myPageData.firstName!);
        setLastName(myPageData.lastName!);
        setShortName(myPageData.shortName!);
        setBirthDate(myPageData.dateOfBirth!);
        setGender(myPageData.gender! === "male" ? 0 : 1);
    }, [myPageData]);

    const posts: ReactElement[] = myPageData.userPosts.map((post: IPost) =>
        <PostItem type={type} firstName={myPageData.firstName} lastName={myPageData.lastName}
                  shortName={myPageData.shortName} postData={post}/>
    );

    const subscribers: ReactElement[] = mySubscribers.map((subscriber: IShortUser) =>
        <ShortUserItem data={subscriber}/>
    );

    const friends: ReactElement[] = myFriends.map((friend: IShortUser) =>
        <ShortUserItem data={friend}/>
    );

    const subscriptions: ReactElement[] = mySubscriptions.map((subscription: IShortUser) =>
        <ShortUserItem data={subscription}/>
    );

    const handleEditProfileSubmit = () => {
        const data = {
            firstName,
            lastName,
            shortName,
            birthDate,
            gender: gender ? "female" : "male",
            avatar: ""
        }

        dispatch(fillProfile2AC(data));
        setEditProfileState(false);
    }

    const handleCreatePostSubmit = () => {
        const data: ICreatePostRequest = {
            image: "",
            profileId: myPageData.profileId,
            content: addPostContent
        }

        const data2: IPost = {
            "id": 0,
            "profileId": myPageData.profileId,
            "publicationDate": new Date().toISOString(),
            "authorImage": "",
            "image": null,
            "content": addPostContent,
            "likes": [],
            "likesCount": 0,
            "commentsCount": 0,
            "comments": []
        }

        dispatch(createPostAC(data, data2));
        setCreatePostState(false);
    }

    let options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timezone: 'UTC',
    };
    const formedDateOfBirth: string = myPageData.dateOfBirth ? new Date(myPageData.dateOfBirth).toLocaleString("ru", options) : "";

    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <div className={"w-fill flex flex-col gap-3"}>

            <Dialog open={profileDetailsState} onOpenChange={() => setProfileDetailsState(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Подробная информация</DialogTitle>
                        <DialogDescription>
                            <div className={"flex flex-col gap-3 mt-3"}>
                                <div className={"flex gap-1 items-center"}>
                                    <AtSign/>
                                    <Label>{myPageData.shortName}</Label>
                                </div>
                                {myPageData.dateOfBirth
                                    && <div className={"flex gap-1 items-center"}>
                                        <Gift/>
                                        <Label>{"День рождения: " + formedDateOfBirth}</Label>
                                    </div>
                                }
                                {myPageData.gender
                                    && <div className={"flex gap-1 items-center"}>
                                        <Ghost/>
                                        <Label>{"Пол: " + (myPageData.gender === "male" ? "Мужской" : "Женский")}</Label>
                                    </div>
                                }
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog open={editProfileState} onOpenChange={() => setEditProfileState(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Редактировать профиль</DialogTitle>
                        <DialogDescription>
                            <div className={"flex flex-col gap-3 mt-3"}>
                                <div className={"flex flex-col gap-1.5"}>
                                    <AuthInput title={"Ваше имя"} placeholder={"Введите имя"} value={firstName}
                                               onChange={setFirstName}/>
                                    <AuthInput title={"Ваша фамилия"} placeholder={"Введите фамилию"} value={lastName}
                                               onChange={setLastName}/>
                                    <AuthInput title={"Никнейм"} placeholder={"Введите никнейм"} value={shortName}
                                               onChange={setShortName}/>
                                    <AuthInput title={"Дата рождения"} placeholder={"2000-03-28"} value={birthDate}
                                               onChange={setBirthDate}/>
                                    <div className={"flex justify-start"}>
                                        <FillProfileGender items={["Мужской", "Женский"]} activeButton={gender}
                                                           setActiveButton={setGender}/>
                                    </div>
                                </div>

                                <div className={"text-red-500"}>

                                </div>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleEditProfileSubmit}>Применить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={createPostState} onOpenChange={() => setCreatePostState(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Создать пост</DialogTitle>
                        <DialogDescription>
                            <div className={"flex flex-col gap-3 mt-3"}>
                                <Textarea value={addPostContent} onChange={(e) => {
                                    setAddPostContent(e.target.value)
                                }}
                                          placeholder={"Напишите что нибудь..."}></Textarea>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleCreatePostSubmit}>Создать</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={imagePreviewState} onOpenChange={() => setImagePreviewState(false)}>
                <DialogContent className={`p-0 max-h-[80vh]`}>
                    <img ref={imgRef} className={"rounded-lg max-h-[80vh]"} src={currentImagePreview} alt=""/>
                </DialogContent>
            </Dialog>


            {/*основная инфа о юзере*/}
            <div
                className={"h-[150px] w-[1032px] bg-white rounded-lg box-border p-3 flex justify-between items-center"}>
                <div className={"h-full flex gap-3"}>
                    <Avatar className={"w-32 h-32"}>
                        <AvatarImage onClick={() => {
                            setImagePreviewState(true);
                            setCurrentImagePreview(myPageData.image!);
                        }} src={myPageData.image!}/>
                        <AvatarFallback className={"text-3xl"}>{(myPageData.firstName && myPageData.lastName)
                            && myPageData.firstName[0] + myPageData.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className={"flex flex-col justify-center items-start h-full gap-2"}>
                        <Label>{myPageData.firstName + " " + myPageData.lastName}</Label>
                        {/*<Label>{"@" + myPageData.shortName}</Label>*/}
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
                        ? <Button variant={"secondary"} onClick={() => {
                            setEditProfileState(true)
                        }}>Редактировать профиль</Button>
                        : <div className={"flex gap-1.5"}>
                            <Button variant={"secondary"}>Подписаться</Button>
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
                        {posts}
                    </div>
                </div>

                <div className={"flex flex-col gap-3"}>
                    <div className={"w-[420px] rounded-lg bg-white box-border flex flex-col gap-3 p-3"}>
                        <div className={"flex flex-col gap-3"}>
                            <Label>{"Подписчики " + myPageData.subscribersCount}</Label>
                            <div className={"flex justify-start items-start gap-1"}>
                                {subscribers}
                            </div>
                        </div>
                        <div className={"flex flex-col gap-3"}>
                            <Label>{"Друзья " + myPageData.friendsCount}</Label>
                            <div className={"flex justify-start items-start gap-1"}>
                                {friends}
                            </div>
                        </div>
                    </div>
                    <div className={"w-[420px] rounded-lg bg-white box-border flex flex-col gap-3 p-3"}>
                        <Label>{"Подписки " + myPageData.subscriptionsCount}</Label>
                        <div className={"flex justify-start items-start gap-1"}>
                            {subscriptions}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;