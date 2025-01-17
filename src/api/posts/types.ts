
export interface ICreatePostRequest {
    "profileId": number | null,
    "content": string | null,
    "image": string | null
}

export interface ICreatePostCommentRequest {
    content: string | null,
    postId: number | null,
}

export interface IDeletePostRequest {
    "profileId": number,
    "postId": number
}

export interface IEditPostRequest {
    "profileId": number,
    "content": string,
    "postId": number,
    "image": string | null
}