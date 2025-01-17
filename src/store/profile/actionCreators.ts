import {Dispatch} from "@reduxjs/toolkit";
import api from "@/api";

import {IFillProfileRequest} from "@/api/profile/types.ts";
import {setUserVerified} from "@/store/auth/new_auth.slice.ts";

import {
    clearAnotherUser,
    editProfile,
    local_createPost,
    local_createPostComment,
    local_deletePost,
    local_editPost,
    local_likePost, local_likePost_another, local_subscribe,
    local_unlikePost, local_unlikePost_another,
    local_updateAvatar,
    setAnotherFriends,
    setAnotherPageData,
    setAnotherSubscribers,
    setAnotherSubscriptions,
    setMyFriends,
    setMyPageData,
    setMySubscribers,
    setMySubscriptions,
    setMyThumbnail
} from "@/store/profile/profile.slice.ts";
import {
    ICreatePostCommentRequest,
    ICreatePostRequest,
    IDeletePostRequest,
    IEditPostRequest
} from "@/api/posts/types.ts";
import {IComment, IPost, IShortUser} from "@/types.ts";
import {
    local_createFeedPostComment,
    local_createRecommendationPostComment,
    local_likePost_feed, local_likePost_recommended, local_unlikePost_feed, local_unlikePost_recommended
} from "@/store/feed/feed.slice.ts";


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

export const getMyFriendsAC = (username: string) => async (dispatch: Dispatch) => {
    try {
        const friendsResponse = await api.profile.getUserFriends(username);
        dispatch(setMyFriends(friendsResponse.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const getMySubscribersAC = (username: string) => async (dispatch: Dispatch) => {
    try {
        const friendsResponse = await api.profile.getUserSubscribers(username);
        dispatch(setMySubscribers(friendsResponse.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const getMySubscriptionsAC = (username: string) => async (dispatch: Dispatch) => {
    try {
        const friendsResponse = await api.profile.getUserSubscriptions(username);
        dispatch(setMySubscriptions(friendsResponse.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const getMyThumbnailAC = () => async (dispatch: Dispatch) => {
    try {
        const response = await api.profile.getMyThumbnail();
        dispatch(setMyThumbnail(response.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const getAnotherFriendsAC = (username: string) => async (dispatch: Dispatch) => {
    try {
        const friendsResponse = await api.profile.getUserFriends(username);
        dispatch(setAnotherFriends(friendsResponse.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const getAnotherSubscribersAC = (username: string) => async (dispatch: Dispatch) => {
    try {
        const friendsResponse = await api.profile.getUserSubscribers(username);
        dispatch(setAnotherSubscribers(friendsResponse.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const getAnotherSubscriptionsAC = (username: string) => async (dispatch: Dispatch) => {
    try {
        const friendsResponse = await api.profile.getUserSubscriptions(username);
        dispatch(setAnotherSubscriptions(friendsResponse.data));
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
        const response = await api.posts.createPost(data);
        dispatch(local_createPost({post: data2, postId: response.data}));
    } catch (error: any) {
        console.error(error);
    }
}

export const editPostAC = (data: IEditPostRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await api.posts.editPost({...data,
            image: data.image && data.image.replace("data:image/jpeg;base64,", "") });
        dispatch(local_editPost(data));
    } catch (error: any) {
        console.error(error);
    }
}

export const updateAvatarAC = (data: FileList, img: string, userId: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(local_updateAvatar({img, userId}))
        await api.profile.updateAvatar({picture: data[0]});


    } catch (error: any) {
        console.error(error);
    }
}

export const deletePostAC = (data: IPost) => async (dispatch: Dispatch) => {
    try {
        const request: IDeletePostRequest = {
            postId: data.id!,
            profileId: data.profileId!,
        }

        await api.posts.deletePost(request);
        dispatch(local_deletePost(request));
    } catch (error: any) {
        console.error(error);
    }
}

export const likePostAC = (postId: number, place: string) => async (dispatch: Dispatch) => {
    try {
        if (place === "myPage") {
            dispatch(local_likePost(postId));
        } else if (place === "anotherPage") {
            dispatch(local_likePost_another(postId));
        } else if (place === "feed") {
            dispatch(local_likePost_feed(postId));
        } else if (place === "recommended") {
            dispatch(local_likePost_recommended(postId));
        }
        await api.posts.likePost(postId);

    } catch (error: any) {
        console.error(error);
    }
}

export const unlikePostAC = (postId: number, place: string) => async (dispatch: Dispatch) => {
    try {
        if (place === "myPage") {
            dispatch(local_unlikePost(postId));
        } else if (place === "anotherPage") {
            dispatch(local_unlikePost_another(postId));
        } else if (place === "feed") {
            dispatch(local_unlikePost_feed(postId));
        } else if (place === "recommended") {
            dispatch(local_unlikePost_recommended(postId));
        }
        await api.posts.unlikePost(postId);

    } catch (error: any) {
        console.error(error);
    }
}

export const createPostCommentAC = (data1: IComment, data2: ICreatePostCommentRequest, place: string) => async (dispatch: Dispatch) => {
    try {
        await api.posts.createPostComment(data2);

        if (place === "myPage" || place === "anotherPage") {
            dispatch(local_createPostComment({comment: data1, postId: data2.postId!, place}));
        } else if (place === "feed") {
            dispatch(local_createFeedPostComment({comment: data1, postId: data2.postId!}));
        } else if (place === "recommended") {
            dispatch(local_createRecommendationPostComment({comment: data1, postId: data2.postId!}));
        }
    } catch (error: any) {
        console.error(error);
    }
}

export const subscribeAC = (data: IShortUser) => async (dispatch: Dispatch) => {
    try {
        dispatch(local_subscribe(data))
        await api.profile.subscribe({profileId: data.profileId});
    } catch (error: any) {
        console.error(error);
    }
}