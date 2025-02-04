import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IComment, IFeed, IPost, IRecommended} from "@/types.ts";
import {IDeletePostRequest, IEditPostRequest} from "@/api/posts/types.ts";


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

        appendFeed: (state, action: PayloadAction<IFeed>) => {
            action.payload.forEach(post => {
                post.authorImage = `data:image/png;base64,${post.authorImage}`;
                post.image = `data:image/png;base64,${post.image}`;
                post.comments.forEach((comment) => {
                    comment.image = `data:image/png;base64,${comment.image}`
                })
            })

            state.feed.push(...action.payload);
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

        appendRecommended: (state, action: PayloadAction<IRecommended>) => {
            action.payload.posts.forEach(post => {
                post.authorImage = `data:image/png;base64,${post.authorImage}`;
                post.image = `data:image/png;base64,${post.image}`;
                post.comments.forEach((comment) => {
                    comment.image = `data:image/png;base64,${comment.image}`
                })
            })

            state.recommended.posts.push(...action.payload.posts);
        },

        local_editPost_feed: (state, action: PayloadAction<IEditPostRequest>) => {
            state.feed.forEach((post: IPost) => {
                if (post.id === action.payload.postId && post.profileId === action.payload.profileId) {
                    post.content = action.payload.content;
                    if (post.image) {
                        post.image = action.payload.image;
                    }
                }
            })
        },

        local_editPost_recommended: (state, action: PayloadAction<IEditPostRequest>) => {
            state.recommended.posts.forEach((post: IPost) => {
                if (post.id === action.payload.postId && post.profileId === action.payload.profileId) {
                    post.content = action.payload.content;
                    if (post.image) {
                        post.image = action.payload.image;
                    }
                }
            })
        },

        local_deletePost_feed: (state, action: PayloadAction<IDeletePostRequest>) => {
            state.feed.forEach((post: IPost, index) => {
                if (post.id === action.payload.postId) {
                    state.feed.splice(index, 1);
                }
            })
        },

        local_deletePost_recommended: (state, action: PayloadAction<IDeletePostRequest>) => {
            state.recommended.posts.forEach((post: IPost, index) => {
                if (post.id === action.payload.postId) {
                    state.recommended.posts.splice(index, 1);
                }
            })
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

        local_editFeedPostComment: (state, action: PayloadAction<{ comment: IComment, postId: number }>) => {
            state.feed.forEach((post: IPost) => {
                if (post.id === action.payload.postId) {
                    post.comments.forEach((comment: IComment) => {
                        if (comment.id === action.payload.comment.id) {
                            comment.content = action.payload.comment.content;
                        }
                    })
                }
            })
        },

        local_editRecommendationPostComment: (state, action: PayloadAction<{ comment: IComment, postId: number }>) => {
            state.recommended.posts.forEach((post: IPost) => {
                if (post.id === action.payload.postId) {
                    post.comments.forEach((comment: IComment) => {
                        if (comment.id === action.payload.comment.id) {
                            comment.content = action.payload.comment.content;
                        }
                    })
                }
            })
        },

        local_deleteFeedPostComment: (state, action: PayloadAction<{ comment: IComment, postId: number }>) => {
            state.feed.forEach((post: IPost) => {
                if (post.id === action.payload.postId) {
                    post.commentsCount!--;
                    post.comments.forEach((comment: IComment, index) => {
                        if (comment.id === action.payload.comment.id) {
                            post.comments.splice(index, 1);
                        }
                    })
                }
            })
        },

        local_deleteRecommendationPostComment: (state, action: PayloadAction<{ comment: IComment, postId: number }>) => {
            state.recommended.posts.forEach((post: IPost) => {
                if (post.id === action.payload.postId) {
                    post.commentsCount!--;
                    post.comments.push(action.payload.comment);
                    post.comments.forEach((comment: IComment, index) => {
                        if (comment.id === action.payload.comment.id) {
                            post.comments.splice(index, 1);
                        }
                    })
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
    resetFeed, setFeed, setRecommended, local_editRecommendationPostComment, local_editFeedPostComment,
    local_editPost_feed, local_editPost_recommended, local_deletePost_feed, local_deletePost_recommended,
    local_createFeedPostComment, local_createRecommendationPostComment, local_deleteRecommendationPostComment, local_deleteFeedPostComment,
    local_unlikePost_feed, local_likePost_feed, local_likePost_recommended, local_unlikePost_recommended, appendFeed,
    appendRecommended,
} = feedSlice.actions;

export default feedSlice.reducer;