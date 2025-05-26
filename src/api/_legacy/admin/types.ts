import {IDetailsResponse, IRegisterRequest} from "@/api/auth/types.ts";
import {UserRolesType} from "@/types.ts";

export type IGetUsersResponse = IDetailsResponse[];

export interface IEditUserRequest extends IRegisterRequest {
    role: UserRolesType;
    id: number;
}

export interface IAddUserResponse {
    "id": number,
    "username": string,
    "shortname": string | null,
    "firstname": string | null,
    "lastname": string | null,
    "email": string,
    "profileId": number,
    "verified": boolean,
    "role": UserRolesType
}

export interface IFillUserRequest {
    "id": number,
    "firstName": string,
    "lastName": string,
    "shortName": string,
    "birthDate": string,
    "gender": string
}

export interface IDeleteUserRequest {
    id: number
}