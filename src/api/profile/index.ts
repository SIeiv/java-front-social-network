import { axiosInstance } from "@/api/instance.ts";
import {AxiosPromise} from "axios";
import endpoints, {BASE_URL} from "@/api/endpoints.ts";
import {
    IFillProfileRequest,
    IGetUserFriendsResponse,
    IGetUserSubscribersResponse,
    IGetUserSubscriptionsResponse, ISearchRequest, ISubscribeRequest,
    IUpdateAvatarRequest,
} from "@/api/profile/types.ts";
import {IShortUser, IUserPage} from "@/types.ts";

export const fillProfile = (params: IFillProfileRequest): AxiosPromise<string> =>
    axiosInstance.post(endpoints.PROFILE.FILL_PROFILE, params, {
        headers: {
            "Content-Type": "application/json"
        }
    });

export const getMyPage = (): AxiosPromise<IUserPage> =>
    axiosInstance.get(endpoints.PROFILE.GET_MY_PAGE);

export const getMyThumbnail = (): AxiosPromise<string> =>
    axiosInstance.get(endpoints.PROFILE.GET_MY_THUMBNAIL);

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
    });