import {UserRoles} from "@/types/userRoles.ts";

export interface IMinimalUser {
    id: number,
    username: string,
    role: UserRoles
}

export interface IMeUser extends IMinimalUser {
    profileId: string,
}