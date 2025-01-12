import {FC, ReactElement, useState} from "react";
import {IComment, IPost} from "@/types.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Ellipsis, Heart, MessageCircle, Pencil, SendHorizontal, Trash2} from "lucide-react";
import CommentItem from "@/new_components/commentItem.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Input} from "@/components/ui/input.tsx";
import ShortNameLink from "@/new_components/shortNameLink.tsx";
import DateLabel from "@/new_components/DateLabel.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {createPostCommentAC, deletePostAC} from "@/store/profile/actionCreators.ts";
import {ICreatePostCommentRequest} from "@/api/posts/types.ts";
import {IDetailsResponse} from "@/api/auth/types.ts";

interface IPostItem {
    postData: IPost
    firstName: string | null
    lastName: string | null
    shortName: string | null
    type?: "my" | "another"
    place: string
}

const PostItem: FC<IPostItem> = ({postData, firstName, lastName, shortName, type, place}) => {
    const dispatch = useAppDispatch();

    const currentUser: IDetailsResponse = useAppSelector(state => state.auth.appInitializeData.initialUserData)
    const myThumbnail = useAppSelector(state => state.profile.myThumbnail);

    const comments: ReactElement[] = postData.comments.map((comment: IComment) =>
        <CommentItem key={comment.id} commentData={comment}/>
    )

    const [isMinimized, setIsMinimized] = useState(true);

    const [commentContent, setCommentContent] = useState("");

    const handleCommentCreate = () => {
        const data1: IComment = {
            id: 0,
            username: currentUser.shortname,
            content: commentContent,
            image: myThumbnail ? myThumbnail : "",
            authorId: 0,
            creationDate: new Date().toISOString(),
            firstName: currentUser.firstname,
            lastName: currentUser.lastname,
        }

        const data2: ICreatePostCommentRequest = {
            postId: postData.id,
            content: commentContent
        }

        dispatch(createPostCommentAC(data1, data2, place));
        setCommentContent("");
    }

    const handleDeletePost = () => {
        dispatch(deletePostAC(postData));
    }

    return (
        <div className={"w-full flex flex-col gap-2"}>
            <div className={"flex justify-between"}>
                <div className={"flex items-center gap-2"}>
                    <Avatar className={""}>
                        <AvatarImage src={postData.authorImage!}/>
                        <AvatarFallback>{(firstName && lastName)
                            && firstName[0] + lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className={"flex flex-col gap-1"}>
                        <Label>{firstName + " " + lastName}</Label>
                        <ShortNameLink content={"@" + shortName} to={`/user/${shortName}`}/>
                    </div>

                </div>
                {type === "my"
                    && <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Pencil />
                                <Label>Изменить</Label>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={handleDeletePost} className={"text-red-600"}>
                                <Trash2 />
                                <Label>Удалить</Label>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                }

            </div>

            {postData.image && <img className={"rounded-lg"} src={postData.image} alt=""/>}

            <Label>
                {postData?.content}
            </Label>

            <div className={"flex justify-between items-center"}>
                <div className={"flex gap-2"}>
                    <Button variant={"ghost"} className={"[&_svg]:size-5 p-1"}>
                        <Heart/>
                        <Label className={"cursor-pointer"}>{postData.likesCount}</Label>
                    </Button>
                    <Button variant={"ghost"} className={"[&_svg]:size-5 p-1"}>
                        <MessageCircle/>
                        <Label className={"cursor-pointer align"}>{postData.commentsCount}</Label>
                    </Button>
                </div>
                {postData.publicationDate && <DateLabel date={postData.publicationDate}/>}
            </div>

            {/*Комменты*/}
            <div className={"flex flex-col items-start gap-5"}>
                <div className={"flex flex-col items-start gap-3 ml-3"}>
                    {isMinimized
                        ? comments[0]
                        : comments
                    }
                </div>
                {(comments.length > 1 && isMinimized)
                    && <Label className={"hover:underline cursor-pointer ml-3"}
                              onClick={() => {
                                  setIsMinimized(false)
                              }}>Показать следующие комментарии</Label>}

                <div className={"flex gap-2 w-full"}>
                    <Input placeholder={"Написать комментарий..."} value={commentContent}
                           onChange={(e) => {setCommentContent(e.target.value)}}/>
                    <Button onClick={handleCommentCreate} className={"h-full"} variant={"ghost"}>
                        <SendHorizontal/>
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default PostItem;