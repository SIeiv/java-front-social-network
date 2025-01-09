import {Dispatch} from "@reduxjs/toolkit";
import api from "@/api";

import {IFillProfileRequest} from "@/api/profile/types.ts";
import {setUserVerified} from "@/store/auth/new_auth.slice.ts";

import {
    clearAnotherUser,
    editProfile,
    local_createPost, local_createPostComment,
    setAnotherFriends,
    setAnotherPageData,
    setAnotherSubscribers,
    setAnotherSubscriptions,
    setMyFriends,
    setMyPageData,
    setMySubscribers,
    setMySubscriptions
} from "@/store/profile/profile.slice.ts";
import {ICreatePostCommentRequest, ICreatePostRequest} from "@/api/posts/types.ts";
import {IComment, IPost} from "@/types.ts";


export const fillProfileAC = (data: IFillProfileRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await api.profile.fillProfile(data)

        if (response.status === 200) {
            dispatch(setUserVerified(true));
            window.location.href = "/";
        }

    } catch (error: any) {
        console.error(error);
    }
}

export const fillProfile2AC = (data: IFillProfileRequest) => async (dispatch: Dispatch) => {
    try {
        await api.profile.fillProfile(data);
        dispatch(editProfile(data));
    } catch (error: any) {
        console.error(error);
    }
}

export const getMyPageAC = () => async (dispatch: Dispatch) => {
    try {
        const response = await api.profile.getMyPage()
        dispatch(setMyPageData(response.data));

        const subscribersResponse = await api.profile.getUserSubscribers(response.data.shortName!);
        dispatch(setMySubscribers(subscribersResponse.data));

        const friendsResponse = await api.profile.getUserFriends(response.data.shortName!);
        dispatch(setMyFriends(friendsResponse.data));

        const subscriptionsResponse = await api.profile.getUserSubscriptions(response.data.shortName!);
        dispatch(setMySubscriptions(subscriptionsResponse.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const getAnotherPageAC = () => async (dispatch: Dispatch) => {

    const url = window.location.href;
    const username = url.split('/').pop()!;

    try {
        dispatch(clearAnotherUser());
        const response = await api.profile.getAnotherPage(username)
        dispatch(setAnotherPageData(response.data));

        const subscribersResponse = await api.profile.getUserSubscribers(username);
        dispatch(setAnotherSubscribers(subscribersResponse.data));

        const friendsResponse = await api.profile.getUserFriends(username);
        dispatch(setAnotherFriends(friendsResponse.data));

        const subscriptionsResponse = await api.profile.getUserSubscriptions(username);
        dispatch(setAnotherSubscriptions(subscriptionsResponse.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const createPostAC = (data: ICreatePostRequest, data2: IPost) => async (dispatch: Dispatch) => {
    try {
        await api.posts.createPost(data);
        dispatch(local_createPost(data2));
    } catch (error: any) {
        console.error(error);
    }
}

export const likePostAC = (postId: number) => async (dispatch: Dispatch) => {
    try {
        await api.posts.likePost(postId);
        //dispatch(local_createPost(data2));
    } catch (error: any) {
        console.error(error);
    }
}

export const createPostCommentAC = (data1: IComment, data2: ICreatePostCommentRequest) => async (dispatch: Dispatch) => {
    try {
        await api.posts.createPostComment(data2);
        dispatch(local_createPostComment({comment: data1, postId: data2.postId!}));
    } catch (error: any) {
        console.error(error);
    }
}