import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IComment, IFeed, IPost, IRecommended} from "@/types.ts";


const initialState = {
    feed: [] as IFeed,

    recommended: {
        profiles: [],
        posts: []
    } as IRecommended,
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setFeed: (state, action: PayloadAction<IFeed>) => {
            action.payload.forEach(post => {
                post.authorImage = `data:image/png;base64,${post.authorImage}`;
                post.image = `data:image/png;base64,${post.image}`;
                post.comments.forEach((comment) => {
                    comment.image = `data:image/png;base64,${comment.image}`
                })
            })

            state.feed = [...action.payload];
        },

        setRecommended: (state, action: PayloadAction<IRecommended>) => {
            action.payload.posts.forEach(post => {
                post.authorImage = `data:image/png;base64,${post.authorImage}`;
                post.image = `data:image/png;base64,${post.image}`;
                post.comments.forEach((comment) => {
                    comment.image = `data:image/png;base64,${comment.image}`
                })
            })

            state.recommended = {...action.payload};
        },


        local_createFeedPostComment: (state, action: PayloadAction<{ comment: IComment, postId: number }>) => {
            state.feed.forEach((post: IPost) => {
                if (post.id === action.payload.postId) {
                    post.commentsCount!++;
                    post.comments.push(action.payload.comment);
                }
            })
        },

        local_createRecommendationPostComment: (state, action: PayloadAction<{ comment: IComment, postId: number }>) => {
            state.recommended.posts.forEach((post: IPost) => {
                if (post.id === action.payload.postId) {
                    post.commentsCount!++;
                    post.comments.push(action.payload.comment);
                }
            })
        },

        resetFeed: () => initialState
    }
})

export const {
    resetFeed, setFeed, setRecommended, local_createFeedPostComment, local_createRecommendationPostComment
} = feedSlice.actions;

export default feedSlice.reducer;