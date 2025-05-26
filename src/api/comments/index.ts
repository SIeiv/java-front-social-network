import {AxiosPromise} from "axios";
import {axiosInstance} from "@/api/instance.ts";
import endpoints from "@/api/endpoints.ts";
import {
    ICreateCommentRequest,
    ICreateCommentResponse,
    IEditCommentRequest,
    IEditCommentResponse
} from "@/api/comments/types.ts";

export const createComment = (data: ICreateCommentRequest): AxiosPromise<ICreateCommentResponse> =>
    axiosInstance.post(endpoints.COMMENTS.CREATE_COMMENT(data.postId), {content: data.content}, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const editComment = (data: IEditCommentRequest): AxiosPromise<IEditCommentResponse> =>
    axiosInstance.put(endpoints.COMMENTS.EDIT_COMMENT(data.commentId), {content: data.content}, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

export const deleteComment = (commentId: number): AxiosPromise<string> =>
    axiosInstance.delete(endpoints.COMMENTS.DELETE_COMMENT(commentId));