import {FC} from "react";
import {IComment} from "@/types.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import ShortNameLink from "@/new_components/shortNameLink.tsx";
import DateLabel from "@/new_components/DateLabel.tsx";

interface ICommentItem {
    commentData: IComment
}

const CommentItem: FC<ICommentItem> = ({commentData}) => {

    return (
        <div className={"flex flex-col gap-1"}>
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

            <Label>{commentData.content}</Label>
            <DateLabel date={commentData.creationDate}/>
        </div>
    );
};

export default CommentItem;