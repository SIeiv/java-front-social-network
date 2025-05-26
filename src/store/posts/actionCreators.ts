import {Dispatch} from "@reduxjs/toolkit";
import {setFeedAppendLoading, setFeedLoading} from "@/store/loading.slice.ts";
import api from "@/api";
import {ICreatePostRequest, IDeletePostRequest, IEditPostRequest, IGetFeedRequest} from "@/api/posts/types.ts";
import {appendFeed, appendRecommended, editPost, setFeed, setRecommended} from "@/store/posts/posts.slice.ts";
import {} from "@/store/_legacy/feed/feed.slice.ts";
import {createPost} from "@/api/posts";
import {local_createPost} from "@/store/profile/profile.slice.ts";
import {getUserPosts} from "@/api/profile";
import {getUserPostsAC} from "@/store/profile/actionCreators.ts";
import {AppDispatch} from "@/store";

export const getFeedAC = (data: IGetFeedRequest) => async (dispatch: Dispatch) => {
    try {
        dispatch(setFeedLoading(true));
        const response = await api.posts.getFeed(data);
        dispatch(setFeed(response.data));
        dispatch(setFeedLoading(false));
    } catch (error: any) {
        console.error(error);
    }
}

export const appendFeedAC = (data: IGetFeedRequest) => async (dispatch: Dispatch) => {
    try {
        dispatch(setFeedAppendLoading(true));
        const response = await api.posts.getFeed(data);
        dispatch(appendFeed(response.data));
        dispatch(setFeedAppendLoading(false));
    } catch (error: any) {
        console.error(error);
    }
}

export const getRecommendedAC = (data: IGetFeedRequest) => async (dispatch: Dispatch) => {
    try {
        dispatch(setFeedLoading(true));
        const response = await api.posts.getRecommended(data);
        dispatch(setRecommended(response.data));
        dispatch(setFeedLoading(false));
    } catch (error: any) {
        console.error(error);
    }
}

export const appendRecommendedAC = (data: IGetFeedRequest) => async (dispatch: Dispatch) => {
    try {
        dispatch(setFeedAppendLoading(true));
        const response = await api.posts.getRecommended(data);
        dispatch(appendRecommended(response.data));
        dispatch(setFeedAppendLoading(false));
    } catch (error: any) {
        console.error(error);
    }
}

export const createPostAC = (data: ICreatePostRequest, profileId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.posts.createPost(data);
        dispatch(getUserPostsAC(profileId));
    } catch (error: any) {
        console.error(error);
    }
}

export const editPostAC = (data: IEditPostRequest, profileId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.posts.editPost(data);
        dispatch(getUserPostsAC(profileId));
    } catch (error: any) {
        console.error(error);
    }
}

export const deletePostAC = (data: IDeletePostRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await api.posts.deletePost(data);
    } catch (error: any) {
        console.error(error);
    }
}

export const likePostAC = (postId: number) => async (dispatch: Dispatch) => {
    try {
        await api.posts.likePost(postId);
    } catch (error: any) {
        console.error(error);
    }
}

export const unlikePostAC = (postId: number) => async (dispatch: Dispatch) => {
    try {
        await api.posts.unlikePost(postId);
    } catch (error: any) {
        console.error(error);
    }
}