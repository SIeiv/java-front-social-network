import {Button} from "@/components/ui/button.tsx";
import loadingCircles from "@/assets/bouncing-circles.svg";
import {FC, ReactElement, useState} from "react";
import {IPost} from "@/types/PostTypes.ts";
import PostItem from "@/new_components/postItem.tsx";
import { IFullProfile } from "@/types/ProfileTypes";
import FormPost from "@/pages/main/user-page/form-post.tsx";

export interface IUserPosts {
    type: "my" | "another";
    loading: boolean;
    posts: IPost[];
    profile: IFullProfile;
}

const UserPosts: FC<IUserPosts> = ({loading, type, posts, profile}) => {

    const [createPostState, setCreatePostState] = useState(false);

    const items: ReactElement[] = posts ? posts.map((post: IPost) =>
        <PostItem type={type} postData={post} place={type === "my" ? "myPage" : "anotherPage"}/>
    ) : [];

    return (
        <div>
            <FormPost state={createPostState} setState={setCreatePostState} type={"add"}
                      profileId={profile.id} thumbnail={profile.avatarPath}
                      place={type === "my" ? "myPage" : "anotherPage"}/>

            <div className={"w-[600px] box-border flex flex-col gap-3"}>
                {type === "my" && <div className={"rounded-lg w-full"}>
                    <Button className={"w-full h-[40px] rounded-lg"} onClick={() => {
                        setCreatePostState(true);
                    }}>Создать пост</Button>
                </div>}
                <div
                    className={"flex flex-col justify-center rounded-lg bg-white items-start p-3 gap-6 box-border"}>
                    {loading
                        ? <img src={loadingCircles} alt="" className={"w-16 h-16 m-auto"}/>
                        : items}
                </div>
            </div>
        </div>

    );
};

export default UserPosts;