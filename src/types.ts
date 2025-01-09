export interface IComment  {
    "id": number,
    "authorId": number,
    "content": string,
    "username": string,
    "creationDate": string,
    "image": string
    "firstName": string,
    "lastName": string,
}

export interface IPost {
    "id": number | null,
    "profileId": number | null,
    "publicationDate": string | null,
    "authorImage": string | null,
    "image": string | null,
    "content": string | null,
    "likes": number[],
    "likesCount": number | null,
    "commentsCount": number | null,
    "comments": IComment[]
}

export interface IUserPage {
    "profileId": number | null,
    "subscribersCount": number | null,
    "subscriptionsCount": number | null,
    "friendsCount": number | null,
    "firstName": string | null,
    "lastName": string | null,
    "shortName": string | null,
    "image": string | null,
    "userPosts": IPost[],
    "dateOfBirth": string | null,
    "gender": string | null
}

export interface IShortUser {
    "profileId": number,
    "shortName": string,
    "thumbnail": string,
    "firstName": string,
    "lastName": string,
}

export interface ILkNavDataType {
    text: string;
    to: string;
}