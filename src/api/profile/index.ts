import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";
import {
    ICreateProfileRequest,
    ICreateProfileResponse,
    IGetUserPostsResponse,
    IGetUserProfileResponse,
    ILinkedUsersResponse,
    ISearchRequest,
    ISearchResponse,
    IUpdatePictureRequest,
    IUpdatePictureResponse,
    IUpdateProfileRequest,
    IUpdateProfileResponse,
} from "@/api/profile/types.ts";

export const createProfile = (params: ICreateProfileRequest): AxiosPromise<ICreateProfileResponse> =>
    axiosInstance.post(endpoints.PROFILE.CREATE_PROFILE, params);

export const updateProfile = (params: IUpdateProfileRequest): AxiosPromise<IUpdateProfileResponse> =>
    axiosInstance.put(endpoints.PROFILE.UPDATE_PROFILE, params, {});

export const updatePicture = (params: IUpdatePictureRequest): AxiosPromise<IUpdatePictureResponse> =>
    axiosInstance.post(endpoints.PROFILE.UPDATE_PICTURE, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const getUserPosts = (id: number): AxiosPromise<IGetUserPostsResponse> =>
    axiosInstance.get(endpoints.PROFILE.GET_USER_POSTS(id));

export const getUserProfile = (id: number): AxiosPromise<IGetUserProfileResponse> =>
    axiosInstance.get(endpoints.PROFILE.GET_PROFILE(id));

export const getUserProfilePicture = (id: number): AxiosPromise<string> =>
    axiosInstance.get(endpoints.PROFILE.GET_PROFILE_PICTURE(id));

export const getUserProfileSubscribers = (id: number): AxiosPromise<ILinkedUsersResponse> =>
    axiosInstance.get(endpoints.PROFILE.GET_PROFILE_SUBSCRIBERS(id));

export const getUserProfileFriends = (id: number): AxiosPromise<ILinkedUsersResponse> =>
    axiosInstance.get(endpoints.PROFILE.GET_PROFILE_FRIENDS(id));

export const getUserProfileSubscriptions = (id: number): AxiosPromise<ILinkedUsersResponse> =>
    axiosInstance.get(endpoints.PROFILE.GET_PROFILE_SUBSCRIPTIONS(id));

export const subscribe = (id: number): AxiosPromise<string> =>
    axiosInstance.post(endpoints.PROFILE.SUBSCRIBE(id));

export const unsubscribe = (id: number): AxiosPromise<string> =>
    axiosInstance.delete(endpoints.PROFILE.SUBSCRIBE(id));

export const search = (data: ISearchRequest): AxiosPromise<ISearchResponse> =>
    axiosInstance.post(endpoints.PROFILE.SEARCH, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })

/*
export const updateAvatar = (params: IUpdateAvatarRequest): AxiosPromise<string> =>
    axiosInstance.post(endpoints.PROFILE.UPDATE_AVATAR, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const getAnotherPage = (username: string): AxiosPromise<IUserPage> =>
    axiosInstance.get(BASE_URL + `/user/${username}`);

export const getUserSubscribers = (username: string): AxiosPromise<IGetUserSubscribersResponse> =>
    axiosInstance.get(BASE_URL + `/user/${username}/get-subscribers`);

export const getUserFriends = (username: string): AxiosPromise<IGetUserFriendsResponse> =>
    axiosInstance.get(BASE_URL + `/user/${username}/get-friends`);

export const getUserSubscriptions = (username: string): AxiosPromise<IGetUserSubscriptionsResponse> =>
    axiosInstance.get(BASE_URL + `/user/${username}/get-subscriptions`);

export const subscribe = (params: ISubscribeRequest): AxiosPromise<string> =>
    axiosInstance.post(endpoints.SUBSCRIPTIONS, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const unsubscribe = (params: ISubscribeRequest): AxiosPromise<string> =>
    axiosInstance.delete(endpoints.SUBSCRIPTIONS, {data: params, headers: {"Content-Type": "multipart/form-data"}});


export const search = (params: ISearchRequest): AxiosPromise<IShortUser[]> =>
    axiosInstance.post(endpoints.PROFILE.SEARCH_PROFILES, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });*/
