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
    "profileId": number,
    verified: boolean,
}