import {IFullProfile, IProfile} from "@/types/ProfileTypes.ts";
import {IPost} from "@/types/PostTypes.ts";

export interface ICreateProfileRequest extends IProfile {}
export interface ICreateProfileResponse {

}

export interface IUpdateProfileRequest extends IProfile {}
export interface IUpdateProfileResponse {
    success: boolean,
    profile: IFullProfile,
}

export interface IUpdatePictureRequest {
    avatar: File
}
export interface IUpdatePictureResponse {

}

export type IGetUserPostsResponse = IPost[];
export type IGetUserProfileResponse = IFullProfile;

export type ILinkedUsersResponse = IFullProfile[];

export interface ISearchRequest {
    details: string
    pageNumber: number
    pageSize: number
}

export type ISearchResponse = IFullProfile[];

/*
export interface ISubscribeRequest {
    profileId: number,
}

export interface ISearchRequest {
    search: string,
}

export type IGetUserSubscribersResponse = IShortUser[];
export type IGetUserFriendsResponse = IShortUser[];
export type IGetUserSubscriptionsResponse = IShortUser[];*/
