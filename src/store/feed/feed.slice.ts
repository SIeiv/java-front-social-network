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

            action.payload.profiles.forEach((profile) => {
                profile.thumbnail = `data:image/png;base64,${profile.thumbnail}`;
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

        local_likePost_feed: (state, action: PayloadAction<number>) => {
            state.feed.forEach((post: IPost) => {
                if (post.id === action.payload) post.likesCount!++;
            })
        },

        local_unlikePost_feed: (state, action: PayloadAction<number>) => {
            state.feed.forEach((post: IPost) => {
                if (post.id === action.payload) post.likesCount!--;
            })
        },

        local_likePost_recommended: (state, action: PayloadAction<number>) => {
            state.recommended.posts.forEach((post: IPost) => {
                if (post.id === action.payload) post.likesCount!++;
            })
        },

        local_unlikePost_recommended: (state, action: PayloadAction<number>) => {
            state.recommended.posts.forEach((post: IPost) => {
                if (post.id === action.payload) post.likesCount!--;
            })
        },

        resetFeed: () => initialState
    }
})

export const {
    resetFeed, setFeed, setRecommended,
    local_createFeedPostComment, local_createRecommendationPostComment,
    local_unlikePost_feed, local_likePost_feed, local_likePost_recommended, local_unlikePost_recommended
} = feedSlice.actions;

export default feedSlice.reducer;