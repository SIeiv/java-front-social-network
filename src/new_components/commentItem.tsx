import {FC, useState} from "react";
import {IComment} from "@/types.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import ShortNameLink from "@/new_components/shortNameLink.tsx";
import DateLabel from "@/new_components/DateLabel.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
import {IDetailsResponse} from "@/api/auth/types.ts";
import {deletePostCommentAC, editPostCommentAC} from "@/store/profile/actionCreators.ts";
import {Textarea} from "@/components/ui/textarea.tsx";

interface ICommentItem {
    commentData: IComment
    postId: number | null
    place: string
}

const CommentItem: FC<ICommentItem> = ({commentData, postId, place}) => {
    const dispatch = useAppDispatch();
    const details: IDetailsResponse = useAppSelector(state => state.auth.appInitializeData.initialUserData);

    const [commentEditMode, setCommentEditMode] = useState(false);
    const [localCommentData, setLocalCommentData] = useState(commentData.content);

    const handleCommentDelete = () => {
        dispatch(deletePostCommentAC(commentData, postId!, place))
    }

    const handleCommentEditSubmit = () => {

        const comment: IComment = {
            ...commentData,
            content: localCommentData
        }

        dispatch(editPostCommentAC(comment, postId!, place));
        setCommentEditMode(false);
    }

    return (
        <div className={"flex flex-col gap-1 w-full"}>
            <div className={"flex gap-2 items-center"}>
                <Avatar className={""}>
                    <AvatarImage src={commentData.image}/>
                    <AvatarFallback>{commentData.username[0] + commentData.username[1]}</AvatarFallback>
                </Avatar>
                <div className={"flex-col flex gap-1"}>
                    <Label>{commentData.firstName + " " + commentData.lastName}</Label>
                    <ShortNameLink content={"@" + commentData.username} to={`/user/${commentData.username}`}/>
                </div>
            </div>

            {(commentEditMode
                && (details.profileId === commentData.authorId || details.role === "ROLE_MODERATOR" || details.role === "ROLE_ADMIN"))
                ? <Textarea onBlur={handleCommentEditSubmit} value={localCommentData} className={"w-full"}
                            onChange={(e) => {
                    setLocalCommentData(e.target.value);
                }}></Textarea>
                : <Label onDoubleClick={() => {setCommentEditMode(true)}}>{commentData.content}</Label>
            }

            <div className={"flex items-center gap-2"}>
                {(details.profileId === commentData.authorId || details.role === "ROLE_MODERATOR" || details.role === "ROLE_ADMIN")
                    && <div className={"flex items-center gap-1"}>
                    <Label className={"cursor-pointer hover:underline"} onClick={() => {setCommentEditMode(true)}}>Изменить</Label>
                    <Label>-</Label>
                    <Label className={"cursor-pointer hover:underline"} onClick={handleCommentDelete}>Удалить</Label>
                </div>}
                <DateLabel date={commentData.creationDate}/>
            </div>

        </div>
    );
};

export default CommentItem;