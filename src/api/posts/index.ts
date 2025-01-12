import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints, {BASE_URL} from "@/api/endpoints.ts";
import {ICreatePostCommentRequest, ICreatePostRequest, IDeletePostRequest} from "@/api/posts/types.ts";

export const createPost = (params: ICreatePostRequest): AxiosPromise<number> =>
    axiosInstance.post(endpoints.POSTS.CREATE_POST, params, {
        headers: {
            "Content-Type": "application/json"
        }
    });

export const likePost = (postId: number): AxiosPromise<string> =>
    axiosInstance.post(BASE_URL + `/posts/like/${postId}`, null, {
        headers: {
            "Content-Type": "application/json"
        }
    });

export const deletePost = (params: IDeletePostRequest): AxiosPromise<string> =>
    axiosInstance.delete(endpoints.POSTS.DELETE_POST, {data: params,});

export const createPostComment = (params: ICreatePostCommentRequest): AxiosPromise<string> =>
    axiosInstance.post(endpoints.POSTS.CREATE_POST_COMMENT, params, {
        headers: {
            "Content-Type": "application/json"
        }
    });