import {IFullProfile} from "@/types/ProfileTypes.ts";

export interface IComment {
    id: number,
    postId: number,
    author: IFullProfile,
    authorId: number,
    content: string,
    creationDate: Date,
}