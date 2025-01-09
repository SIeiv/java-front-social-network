import {IShortUser} from "@/types.ts";


export interface IFillProfileRequest {
    "firstName": string,
    "lastName": string,
    "shortName": string,
    "birthDate": string,
    "gender": string,
    "avatar": string//?
}

export type IGetUserSubscribersResponse = IShortUser[];
export type IGetUserFriendsResponse = IShortUser[];
export type IGetUserSubscriptionsResponse = IShortUser[];