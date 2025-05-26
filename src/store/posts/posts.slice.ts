import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPost} from "@/types/PostTypes.ts";
import {IEditPostResponse, IGetFeedResponse} from "@/api/posts/types.ts";
import {formatAvatarPath, formatPostImagesPath} from "@/helpers.ts";

const initialState = {
    feed: [] as IPost[],
    recommended: [] as IPost[],
    postBuffer: null as IPost | null,
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setFeed: (state, action: PayloadAction<IGetFeedResponse>) => {
            state.feed = formatPostImagesPath(action.payload);
        },

        appendFeed: (state, action: PayloadAction<IGetFeedResponse>) => {
            state.feed = [...state.feed, ...formatPostImagesPath(action.payload)];
        },

        setRecommended: (state, action: PayloadAction<IGetFeedResponse>) => {
            state.recommended = formatPostImagesPath(action.payload);
        },

        appendRecommended: (state, action: PayloadAction<IGetFeedResponse>) => {
            state.recommended = [...state.recommended, ...formatPostImagesPath(action.payload)];
        },

        editPost: (state, action: PayloadAction<IEditPostResponse>) => {
            state.postBuffer = formatPostImagesPath([action.payload.post])[0];
        },

        resetPosts: () => initialState
    }
})

export const {
    setFeed,
    resetPosts,
    appendFeed,
    editPost,
    setRecommended,
    appendRecommended
} = postsSlice.actions;

export default postsSlice.reducer;