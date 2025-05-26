import {FC, ReactElement, useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Heart, MessageCircle, Pencil, SendHorizontal, Trash2} from "lucide-react";
import CommentItem from "@/new_components/commentItem.tsx";
import {Input} from "@/components/ui/input.tsx";
import ShortNameLink from "@/new_components/shortNameLink.tsx";
import DateLabel from "@/new_components/DateLabel.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
//import {createPostCommentAC, deletePostAC, likePostAC, unlikePostAC} from "@/store/profile/actionCreators.ts";
import {ICreatePostCommentRequest} from "@/api/posts/types.ts";
import FormPost from "@/pages/main/user-page/form-post.tsx";

import filledHeart from "../assets/heart.svg";
import {IMeUser} from "@/types/userTypes.ts";
import {IFullProfile} from "@/types/ProfileTypes.ts";
import {UserRoles} from "@/types/userRoles.ts";
import {IPost} from "@/types/PostTypes.ts";
import {IComment} from "@/types/CommentTypes.ts";
import {deletePostAC, likePostAC, unlikePostAC} from "@/store/posts/actionCreators.ts";
import {createCommentAC} from "@/store/comments/actionCreators.ts";

interface IPostItem {
    postData: IPost
    type?: "my" | "another"
    place: string
}

const PostItem: FC<IPostItem> = ({postData, type, place}) => {
    const dispatch = useAppDispatch();

    const profile: IFullProfile = useAppSelector(state => state.profile.userPageData);
    const me: IMeUser = useAppSelector(state => state.auth.appInitializeData.me);
    const avatarPath = useAppSelector(state => state.profile.myAvatarPath);

    const [localPostData, setLocalPostData] = useState(postData);

    useEffect(() => {
        setLocalPostData(postData);
    }, [postData]);

    const comments: ReactElement[] = Array.isArray(localPostData.comments) ? localPostData.comments!.map((comment: IComment) =>
        <CommentItem key={comment.id} commentData={comment} postId={localPostData.id} place={place}/>
    ) : []

    const [isMinimized, setIsMinimized] = useState(true);

    const [commentContent, setCommentContent] = useState("");

    const [editPostState, setEditPostState] = useState(false);

    const [isLiked, setIsLiked] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const postBuffer = useAppSelector(state => state.posts.postBuffer);
    const commentBuffer = useAppSelector(state => state.comments.commentBuffer);

    const handleCreateComment = () => {
        dispatch(createCommentAC({postId: localPostData.id, content: commentContent}));
        setCommentContent("");
    }
    useEffect(() => {
        if (commentBuffer && commentBuffer.postId === localPostData.id)
            setLocalPostData({...localPostData, comments: [...localPostData.comments, commentBuffer]});
    }, [commentBuffer]);

    const handleDeletePost = () => {
        dispatch(deletePostAC({postId: localPostData.id}));
        setIsDeleted(true);
    }

    useEffect(() => {
        for (let i = 0; i < localPostData.likes.length; i++) {
            if (localPostData.likes[i] === Number(me.profileId)) setIsLiked(true);
        }
    }, []);

    useEffect(() => {
        try {
            if (postBuffer && (postBuffer.id === localPostData.id)) {
                setLocalPostData(postBuffer);
            }
        } catch (e) {}
    }, [postBuffer]);

    return (
        <div className={"w-full"}>
            <FormPost state={editPostState} setState={setEditPostState} type={"edit"} postId={postData.id}
                      profileId={Number(localPostData.userId)} thumbnail={avatarPath} prevPostContent={postData.content}
                      place={place} localPostData={localPostData} setLocalPostData={setLocalPostData}
            />

            {isDeleted
                ? <div>Удалено</div>
                : <div className={"w-full flex flex-col gap-2"}>
                    <div className={"flex justify-between"}>
                        <div className={"flex items-center gap-2"}>
                            <Avatar className={""}>
                                <AvatarImage src={localPostData.author.avatarPath!}/>
                                <AvatarFallback>{(localPostData.author.firstName && localPostData.author.lastName)
                                    && localPostData.author.firstName[0] + localPostData.author.lastName[0]}</AvatarFallback>
                            </Avatar>
                            <div className={"flex flex-col gap-1"}>
                                <Label>{localPostData.author.firstName + " " + localPostData.author.lastName}</Label>
                                <ShortNameLink content={"@" + localPostData.author.shortName}
                                               to={`/user/${localPostData.author.id}`}/>
                            </div>

                        </div>
                        {(type === "my" || me.role === UserRoles.Moderator || me.role === UserRoles.Admin)
                            && <div>
                                <Button variant={"ghost"} className={"p-1 [&_svg]:size-5"} onClick={() => {
                                    setEditPostState(true)
                                }}>
                                    <Pencil/>
                                </Button>
                                <Button variant={"ghost"} className={"p-1 [&_svg]:size-5"} onClick={handleDeletePost}>
                                    <Trash2 className={"text-red-600"}/>
                                </Button>
                            </div>
                        }

                    </div>

                    {localPostData.imagePath && <img className={"rounded-lg"} src={localPostData.imagePath} alt=""/>}

                    <Label>
                        {localPostData?.content}
                    </Label>

                    <div className={"flex justify-between items-center"}>
                        <div className={"flex gap-2"}>
                            {isLiked
                                ? <Button variant={"ghost"} className={"[&_svg]:size-5 p-1"} onClick={() => {
                                    setIsLiked(false);
                                    dispatch(unlikePostAC(postData.id ? postData.id : 0))
                                    setLocalPostData({...localPostData, likesCount: localPostData.likesCount - 1})
                                }}>
                                    <img className={"w-5"} src={filledHeart} alt=""/>
                                    <Label className={"cursor-pointer"}>{localPostData.likesCount}</Label>
                                </Button>
                                : <Button variant={"ghost"} className={"[&_svg]:size-5 p-1"} onClick={() => {
                                    setIsLiked(true);
                                    dispatch(likePostAC(postData.id ? postData.id : 0))
                                    setLocalPostData({...localPostData, likesCount: localPostData.likesCount + 1})
                                }}>
                                    <Heart/>
                                    <Label className={"cursor-pointer"}>{localPostData.likesCount}</Label>
                                </Button>
                            }

                            <Button variant={"ghost"} className={"[&_svg]:size-5 p-1"}>
                                <MessageCircle/>
                                <Label className={"cursor-pointer align"}>{localPostData.comments.length}</Label>
                            </Button>
                        </div>
                        {localPostData.publicationDate && <DateLabel date={localPostData.publicationDate.toString()}/>}
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
                                   onChange={(e) => {
                                       setCommentContent(e.target.value)
                                   }}/>
                            <Button onClick={handleCreateComment} className={"h-full"} variant={"ghost"}>
                                <SendHorizontal/>
                            </Button>
                        </div>
                    </div>

                </div>
            }


        </div>

    );
};

export default PostItem;