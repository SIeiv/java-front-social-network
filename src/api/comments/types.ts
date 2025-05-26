import {IComment} from "@/types/CommentTypes.ts";

export interface ICreateCommentRequest {
    postId: number;
    content: string;
}

export interface ICreateCommentResponse extends IComment {}

export interface IEditCommentRequest {
    commentId: number;
    content: string;
}

export interface IEditCommentResponse extends IComment {}