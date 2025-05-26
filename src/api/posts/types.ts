import {IPost} from "@/types/PostTypes.ts";

export interface ICreatePostRequest {
    "content": string | null,
    "image": File | null
}

export type ICreatePostResponse = IPost;

export interface IEditPostRequest extends ICreatePostRequest {
    id: number;
}

export interface IEditPostResponse {
    success: boolean;
    post: IPost;
}

export interface IDeletePostRequest {
    postId: number;
}

export interface ICreatePostCommentRequest {
    content: string | null,
    postId: number | null,
}

export interface IGetFeedRequest {
    pageSize: number,
    pageNumber: number,
}

export type IGetFeedResponse = IPost[]

