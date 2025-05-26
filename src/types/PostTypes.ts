import {IComment} from "@/types/CommentTypes.ts";
import {IFullProfile} from "@/types/ProfileTypes.ts";

export interface IPost {
    id: number,
    userId: string,
    author: IFullProfile,
    publicationDate: Date,
    imagePath: string,
    content: string,
    comments: IComment[],
    likes: number[],
    likesCount: number
}