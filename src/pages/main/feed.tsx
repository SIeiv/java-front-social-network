import {Button} from "@/components/ui/button.tsx";
import {FC, ReactElement, useEffect} from "react";
import {IPost, IRecommended, IShortUser} from "@/types.ts";
import PostItem from "@/new_components/postItem.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {getFeedAC, getRecommendedAC} from "@/store/feed/actionCreators.ts";
import {NavLink, useLocation} from "react-router";
import {Label} from "@/components/ui/label.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import ShortUserItem from "@/new_components/shortUserItem.tsx";

interface IFeedProps {
    type: "main" | "recommended";
}

const Feed: FC<IFeedProps> = ({type}) => {
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    let feed: IPost[] = [];
    let recommendedFeed: IRecommended = {
        posts: [],
        profiles: []
    };
    let recommendedUsers: IShortUser[] = [];
    let recommendedUsersEls: ReactElement[][] = [];

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

    const carouselSize = 5;
    let carouselEls: ReactElement[] = [];
    let arr = [];
    for (let i = 0; i < recommendedUsers.length; i++) {
        arr.push(<ShortUserItem data={recommendedUsers[i]}/>);
        if (arr.length === carouselSize) {
            carouselEls.push(<CarouselItem className={"flex"}>{arr}</CarouselItem>)
            arr = [];
        }
    }

    const feedPosts: ReactElement[] = feed.map((post: IPost) =>
        <PostItem type={"another"} place={"feed"} firstName={post.firstName} lastName={post.lastName}
                  shortName={post.shortName} postData={post}/>
    );

    const recommendedFeedPosts: ReactElement[] = recommendedFeed.posts.map((post: IPost) =>
        <PostItem type={"another"} place={"recommended"} firstName={post.firstName} lastName={post.lastName}
                  shortName={post.shortName} postData={post}/>
    );

    return (
        <div className={"flex gap-3"}>
            <div className={"w-[600px] box-border flex flex-col gap-3"}>
                {
                    type === "recommended" &&
                    <div className={"w-[600px] box-border flex flex-col gap-3 rounded-lg bg-white items-start p-3"}>
                        <Label>Рекомендованные пользователи</Label>
                        <div className={"w-full flex justify-center"}>
                            <Carousel className={"w-[476px]"}>
                                <CarouselContent>
                                    {carouselEls}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                        {recommendedUsersEls}
                    </div>
                }
                <div
                    className={"flex flex-col justify-center rounded-lg bg-white items-start p-3 gap-6 box-border"}>
                    {type === "main" ? feedPosts : recommendedFeedPosts}
                </div>
            </div>

            <div className={"flex flex-col gap-3 sticky top-[96px] h-32"}>
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