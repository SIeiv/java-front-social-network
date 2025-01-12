import {IShortUser} from "@/types.ts";


export interface IFillProfileRequest {
    "firstName": string,
    "lastName": string,
    "shortName": string,
    "birthDate": string,
    "gender": string,
    "avatar": string//?
}

export interface IUpdateAvatarRequest {
    picture: File
}

export type IGetUserSubscribersResponse = IShortUser[];
export type IGetUserFriendsResponse = IShortUser[];
export type IGetUserSubscriptionsResponse = IShortUser[];