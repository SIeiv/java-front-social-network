import {Button} from "@/components/ui/button.tsx";
import {ReactElement} from "react";
import {IPost} from "@/types.ts";
import PostItem from "@/new_components/postItem.tsx";

const Feed = () => {


    const posts: ReactElement[] = myPageData.userPosts.map((post: IPost) =>
        <PostItem type={type} firstName={myPageData.firstName} lastName={myPageData.lastName}
                  shortName={myPageData.shortName} postData={post}/>
    );

    return (
        <div>
            <div className={"w-[600px] box-border flex flex-col gap-3"}>
                {/*{type === "my" && <div className={"rounded-lg w-full"}>
                    <Button className={"w-full h-[40px] rounded-lg"} onClick={() => {
                        setCreatePostState(true);
                    }}>Создать пост</Button>
                </div>}*/}
                <div
                    className={"flex flex-col justify-center rounded-lg bg-white items-start p-3 gap-6 box-border"}>
                    {posts}
                </div>
            </div>
        </div>
    );
};

export default Feed;