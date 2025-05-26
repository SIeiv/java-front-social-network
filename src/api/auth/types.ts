import {IMeUser, IMinimalUser} from "@/types/userTypes.ts";

export interface ILoginRequest {
    "username": string,
    "password": string,
}

export interface ILoginResponse {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    expiresAt: Date,
    user: IMinimalUser
}

export interface ILogoutRequest {
    refreshToken: string,
}

export interface ILogoutResponse {
    success: boolean,
    message: string
}

export interface IRegisterRequest extends ILoginRequest {}

// чето тут надо перелогиниваться вроде когда зареган
// чушь какая то
export interface IRegisterResponse extends ILoginResponse {
    message: string,

}

export interface IMeResponse {
    success: boolean,
    user: IMeUser
}

export interface IRefreshTokenRequest {
    refreshToken: string,
}

export interface IRefreshTokenResponse {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    expiresAt: Date,
}