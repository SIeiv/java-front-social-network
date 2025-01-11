import {Button} from "@/components/ui/button.tsx";
import {FC, ReactElement, useEffect, useState} from "react";
import {IFeed, IPost, IRecommended, IShortUser} from "@/types.ts";
import PostItem from "@/new_components/postItem.tsx";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/hooks.ts";
import {getFeedAC, getRecommendedAC} from "@/store/feed/actionCreators.ts";
import {Label} from "@/components/ui/label.tsx";
import {NavLink, useLocation} from "react-router";

interface IFeedProps {
    type: "main" | "recommended";
}

const Feed: FC<IFeedProps> = ({type}) => {
    const dispatch = useDispatch();
    const {pathname} = useLocation();

    let feed: IPost[] = [];
    let recommendedFeed: IRecommended = {
        posts: [],
        profiles: []
    };
    let recommendedUsers: IShortUser[] = [];
    let recommendedUsersEls: ReactElement[] = [];

    if (type === "main") {
        feed = useAppSelector(state => state.feed.feed);
        recommendedFeed = {
            posts: [],
            profiles: []
        };
    } else if (type === "recommended") {
        feed = [];
        recommendedFeed = useAppSelector(state => state.feed.recommended);
    }

    recommendedUsers = useAppSelector(state => state.feed.recommended.profiles);

    useEffect(() => {
        if (type === "main") {
            if (!feed.length) dispatch(getFeedAC());
        } else {
            if (!recommendedFeed.posts.length) dispatch(getRecommendedAC());
        }
    }, [pathname]);

    recommendedUsersEls = recommendedUsers.map((user) =>
        <div>{user.firstName}</div>
    )

    const feedPosts: ReactElement[] = feed.map((post: IPost) =>
        <PostItem type={"another"} firstName={post.firstName} lastName={post.lastName}
                  shortName={post.shortName} postData={post}/>
    );

    const recommendedFeedPosts: ReactElement[] = recommendedFeed.posts.map((post: IPost) =>
        <PostItem type={"another"} firstName={post.firstName} lastName={post.lastName}
                  shortName={post.shortName} postData={post}/>
    );

    return (
        <div className={"flex gap-3"}>
            <div className={"w-[600px] box-border flex flex-col gap-3"}>
                {
                    type === "recommended" &&
                    <div className={"w-[600px] box-border flex flex-col gap-3 rounded-lg bg-white items-start p-3 box-border"}>
                        {recommendedUsersEls}
                    </div>
                }
                <div
                    className={"flex flex-col justify-center rounded-lg bg-white items-start p-3 gap-6 box-border"}>
                    {type === "main" ? feedPosts : recommendedFeedPosts}
                </div>
            </div>

            <div className={"flex flex-col gap-3"}>
                <div className={"w-[420px] rounded-lg bg-white box-border flex flex-col p-3 gap-1"}>
                    <NavLink to={"/feed/main"} className={({isActive,}) =>
                        isActive ? "bg-accent rounded-md" : ""}>
                        <Button variant={"ghost"} className={"justify-start h-11 w-full"}>Лента</Button>
                    </NavLink>
                    <NavLink to={"/feed/recommended"} className={({isActive,}) =>
                        isActive ? "bg-accent rounded-md" : ""}>
                        <Button variant={"ghost"} className={"justify-start h-11 w-full"}>Рекомендации</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Feed;