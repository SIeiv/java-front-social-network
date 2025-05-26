import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints, {BASE_URL} from "@/api/endpoints.ts";
import {
    ICreatePostRequest, ICreatePostResponse,
    IDeletePostRequest,
    IEditPostRequest, IEditPostResponse, IGetFeedRequest, IGetFeedResponse
} from "@/api/posts/types.ts";

export const createPost = (params: ICreatePostRequest): AxiosPromise<ICreatePostResponse> =>
    axiosInstance.post(endpoints.POSTS.CREATE_POST, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const editPost = (params: IEditPostRequest): AxiosPromise<IEditPostResponse> =>
    axiosInstance.put(endpoints.POSTS.EDIT_POST(params.id), params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const likePost = (postId: number): AxiosPromise<string> =>
    axiosInstance.post(endpoints.POSTS.LIKE_POST(postId));

export const unlikePost = (postId: number): AxiosPromise<string> =>
    axiosInstance.delete(endpoints.POSTS.UNLIKE_POST(postId));

export const deletePost = (params: IDeletePostRequest): AxiosPromise<string> =>
    axiosInstance.delete(endpoints.POSTS.DELETE_POST(params.postId));

export const getFeed = (params: IGetFeedRequest): AxiosPromise<IGetFeedResponse> =>
    axiosInstance.get(endpoints.POSTS.GET_FEED, {
        params
    })

export const getRecommended = (params: IGetFeedRequest): AxiosPromise<IGetFeedResponse> =>
    axiosInstance.get(endpoints.POSTS.GET_RECOMMENDED, {
        params
    })