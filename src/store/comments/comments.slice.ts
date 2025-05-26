import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {formatAvatarPath} from "@/helpers.ts";
import {ICreateCommentResponse} from "@/api/comments/types.ts";
import {IComment} from "@/types/CommentTypes.ts";

const initialState = {
    commentBuffer: null as IComment | null,
}

export const postsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setCommentBuffer: (state, action: PayloadAction<ICreateCommentResponse>) => {
            state.commentBuffer = {...action.payload, author: {...action.payload.author, avatarPath: formatAvatarPath(action.payload.author.avatarPath)}};
        },

        resetComments: () => initialState
    }
})

export const {
    setCommentBuffer,
    resetComments,
} = postsSlice.actions;

export default postsSlice.reducer;