import {Button} from "@/components/ui/button.tsx";
import {FC, ReactElement, useEffect, useState} from "react";
import {IPost, IRecommended, IShortUser} from "@/types.ts";
import PostItem from "@/new_components/postItem.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {appendFeedAC, getFeedAC, getRecommendedAC} from "@/store/feed/actionCreators.ts";
import {NavLink, useLocation} from "react-router";
import {Label} from "@/components/ui/label.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import ShortUserItem from "@/new_components/shortUserItem.tsx";
import loadingCircles from "@/assets/bouncing-circles.svg";
import ShortUserSkeleton from "@/new_components/shortUserSkeleton.tsx";
import {setFeedAppendLoading} from "@/store/loading.slice.ts";

interface IFeedProps {
    type: "main" | "recommended";
}

const Feed: FC<IFeedProps> = ({type}) => {
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    const isLoading = useAppSelector(state => state.loading.feedLoading);
    const isFeedAppendLoading = useAppSelector(state => state.loading.feedAppendLoading);

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

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(0);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            dispatch(setFeedAppendLoading(true));
            console.log(isFeedAppendLoading);
        }

    }

    useEffect(() => {
        if (isFeedAppendLoading) {
            setCurrentPage(currentPage + 1);
            dispatch(appendFeedAC(pageSize, currentPage));
        }

    }, [isFeedAppendLoading]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {removeEventListener('scroll', scrollHandler)};
    }, []);

    useEffect(() => {
        setCurrentPage(0);
        if (type === "main") {
            if (!feed.length) {
                dispatch(getFeedAC(pageSize, currentPage));
                setCurrentPage(currentPage + 1);
            }
        } else {
            if (!recommendedFeed.posts.length) dispatch(getRecommendedAC(pageSize, currentPage));
        }
    }, [pathname]);

    const carouselSize = 5;
    let carouselEls: ReactElement[] = [];

    let arr = [];
    for (let i = 0; i < (isLoading ? carouselSize : recommendedUsers.length); i++) {

        if (isLoading) {
            arr.push(<ShortUserSkeleton/>);
        } else {
            arr.push(<ShortUserItem data={recommendedUsers[i]}/>);
        }

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
                    {isLoading
                        ? <img src={loadingCircles} alt="" className={"w-16 h-16 m-auto"}/>
                        : (type === "main"
                            ? feedPosts
                            : recommendedFeedPosts)
                    }
                </div>

                <div className={"rounded-lg bg-white p-3 mb-3"}>
                    {isFeedAppendLoading && <img src={loadingCircles} alt="" className={"w-16 h-16 m-auto"}/>}
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