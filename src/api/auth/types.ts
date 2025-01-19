import {UserRolesType} from "@/types.ts";

export interface ILoginRequest {
    "email": string,
    "password": string,
}

export interface IRegisterRequest {
    "email": string,
    "password": string,
    "username": string,
}

export interface IDetailsResponse {
    "id": number,
    "username": string,
    "shortname": string,
    "firstname": string,
    "lastname": string,
    role: UserRolesType,
    "email": string,
    "profileId": number,
    verified: boolean,
}