
export interface ICreatePostRequest {
    "profileId": number | null,
    "content": string | null,
    "image": string | null
}

export interface ICreatePostCommentRequest {
    content: string | null,
    postId: number | null,
}