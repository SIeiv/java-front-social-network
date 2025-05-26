import { Dispatch } from "react";
import {ICreatePostRequest} from "@/api/posts/types.ts";
import {ICreateCommentRequest, IEditCommentRequest} from "@/api/comments/types";
import api from "@/api";
import {setCommentBuffer} from "@/store/comments/comments.slice.ts";

export const createCommentAC = (data: ICreateCommentRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await api.comments.createComment(data);
        dispatch(setCommentBuffer(response.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const editCommentAC = (data: IEditCommentRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await api.comments.editComment(data);
        dispatch(setCommentBuffer(response.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const deleteCommentAC = (data: number) => async (dispatch: Dispatch) => {
    try {
        const response = await api.comments.deleteComment(data);
    } catch (error: any) {
        console.error(error);
    }
}