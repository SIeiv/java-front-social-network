import {FC, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import ShortNameLink from "@/new_components/shortNameLink.tsx";
import DateLabel from "@/new_components/DateLabel.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks.ts";
//import {deletePostCommentAC, editPostCommentAC} from "@/store/profile/actionCreators.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import {IMeUser} from "@/types/userTypes.ts";
import {UserRoles} from "@/types/userRoles.ts";
import {IComment} from "@/types/CommentTypes.ts";
import {deleteCommentAC, editCommentAC} from "@/store/comments/actionCreators.ts";
import {IEditCommentRequest} from "@/api/comments/types.ts";

interface ICommentItem {
    commentData: IComment
    postId: number | null
    place: string
}

const CommentItem: FC<ICommentItem> = ({commentData}) => {
    const dispatch = useAppDispatch();
    const me: IMeUser = useAppSelector(state => state.auth.appInitializeData.me);

    const [commentEditMode, setCommentEditMode] = useState(false);
    const [localCommentData, setLocalCommentData] = useState(commentData.content);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleCommentDelete = () => {
        dispatch(deleteCommentAC(commentData.id));
        setIsDeleted(true);
    }

    const handleCommentEditSubmit = () => {

        const comment: IEditCommentRequest = {
            commentId: commentData.id,
            content: localCommentData
        }

        dispatch(editCommentAC(comment));
        setCommentEditMode(false);
    }

    return (
        <div>
            {isDeleted
                ? <div>Удалено</div>
                : <div className={"flex flex-col gap-1 w-full"}>
                    <div className={"flex gap-2 items-center"}>
                        <Avatar className={""}>
                            <AvatarImage src={commentData.author.avatarPath}/>
                            <AvatarFallback>{commentData.author.firstName[0] + commentData.author.lastName[1]}</AvatarFallback>
                        </Avatar>
                        <div className={"flex-col flex gap-1"}>
                            <Label>{commentData.author.firstName + " " + commentData.author.lastName}</Label>
                            <ShortNameLink content={"@" + commentData.author.shortName}
                                           to={`/user/${commentData.authorId}`}/>
                        </div>
                    </div>

                    {(commentEditMode
                        && (Number(me.profileId) === commentData.authorId || me.role === UserRoles.Moderator || me.role === UserRoles.Admin))
                        ? <Textarea onBlur={handleCommentEditSubmit} value={localCommentData} className={"w-full"}
                                    onChange={(e) => {
                                        setLocalCommentData(e.target.value);
                                    }}></Textarea>
                        : <Label onDoubleClick={() => {
                            setCommentEditMode(true)
                        }}>{localCommentData}</Label>
                    }

                    <div className={"flex items-center gap-2"}>
                        {(Number(me.profileId) === commentData.authorId || me.role === UserRoles.Moderator || me.role === UserRoles.Admin)
                            && <div className={"flex items-center gap-1"}>
                                <Label className={"cursor-pointer hover:underline"} onClick={() => {
                                    setCommentEditMode(true)
                                }}>Изменить</Label>
                                <Label>-</Label>
                                <Label className={"cursor-pointer hover:underline"}
                                       onClick={handleCommentDelete}>Удалить</Label>
                            </div>}
                        <DateLabel date={commentData.creationDate.toString()}/>
                    </div>

                </div>
            }
        </div>

    );
};

export default CommentItem;