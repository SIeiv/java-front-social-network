import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {IComment, IPost, IShortUser, IUserPage} from "@/types.ts";
import {IFillProfileRequest, ISubscribeRequest} from "@/api/profile/types.ts";
import {ICreatePostCommentRequest, IDeletePostRequest, IEditPostRequest} from "@/api/posts/types.ts";


const initialState = {
    myPageData: {
        "profileId": null,
        "subscribersCount": null,
        "subscriptionsCount": null,
        "friendsCount": null,
        "firstName": null,
        "lastName": null,
        "shortName": null,
        "image": null,
        "userPosts": [],
        "dateOfBirth": null,
        "gender": null
    } as IUserPage,
    mySubscribers: [] as IShortUser[],
    myFriends: [] as IShortUser[],
    mySubscriptions: [] as IShortUser[],
    myThumbnail: null as null | string,

    anotherPageData: {
        "profileId": null,
        "subscribersCount": null,
        "subscriptionsCount": null,
        "friendsCount": null,
        "firstName": null,
        "lastName": null,
        "shortName": null,
        "image": null,
        "userPosts": [],
        "dateOfBirth": null,
        "gender": null
    } as IUserPage,
    anotherSubscribers: [] as IShortUser[],
    anotherFriends: [] as IShortUser[],
    anotherSubscriptions: [] as IShortUser[],

}

export const authSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setMyPageData: (state, action: PayloadAction<IUserPage>) => {
            action.payload.userPosts.forEach((post) => {
                post.authorImage = `data:image/png;base64,${post.authorImage}`;
                post.image = `data:image/png;base64,${post.image}`;
                post.comments.forEach((comment) => {
                    comment.image = `data:image/png;base64,${comment.image}`
                })
            })

            state.myPageData = {
                ...action.payload,
                image: `data:image/png;base64,${action.payload.image}`,
            };
        },

        setMySubscribers: (state, action: PayloadAction<IShortUser[]>) => {
            action.payload.forEach(user => {
                user.thumbnail = `data:image/png;base64,${user.thumbnail}`
            })
            state.mySubscribers = [...action.payload];
        },
        setMyFriends: (state, action: PayloadAction<IShortUser[]>) => {
            action.payload.forEach(user => {
                user.thumbnail = `data:image/png;base64,${user.thumbnail}`
            })
            state.myFriends = [...action.payload];
        },
        setMySubscriptions: (state, action: PayloadAction<IShortUser[]>) => {
            action.payload.forEach(user => {
                user.thumbnail = `data:image/png;base64,${user.thumbnail}`
            })
            state.mySubscriptions = [...action.payload];
        },

        setMyThumbnail: (state, action: PayloadAction<string>) => {
            state.myThumbnail = `data:image/png;base64,${action.payload}`;
        },

        editProfile: (state, action: PayloadAction<IFillProfileRequest>) => {
            state.myPageData.firstName = action.payload.firstName;
            state.myPageData.lastName = action.payload.lastName;
            state.myPageData.shortName = action.payload.shortName;
            state.myPageData.dateOfBirth = action.payload.birthDate;
            state.myPageData.gender = action.payload.gender;
            state.myPageData.image = action.payload.avatar;
        },

        local_createPost: (state, action: PayloadAction<{post: IPost, postId: number}>) => {
            const finallyPost: IPost = {
                ...action.payload.post,
                id: action.payload.postId,
            }

            state.myPageData.userPosts.push(finallyPost);
        },

        local_editPost: (state, action: PayloadAction<IEditPostRequest>) => {
            state.myPageData.userPosts.forEach((post: IPost) => {
                if (post.id === action.payload.postId && post.profileId === action.payload.profileId) {
                    post.content = action.payload.content;
                    if (post.image) {
                        post.image = action.payload.image;
                    }
                }
            })
        },

        local_deletePost: (state, action: PayloadAction<IDeletePostRequest>) => {
            state.myPageData.userPosts.forEach((post: IPost, index) => {
                if (post.id === action.payload.postId) {
                    state.myPageData.userPosts.splice(index, 1);
                }
            })
        },

        local_likePost: (state, action: PayloadAction<number>) => {
            state.myPageData.userPosts.forEach((post: IPost) => {
                if (post.id === action.payload) post.likesCount!++;
            })
        },

        local_unlikePost: (state, action: PayloadAction<number>) => {
            state.myPageData.userPosts.forEach((post: IPost) => {
                if (post.id === action.payload) post.likesCount!--;
            })
        },

        local_likePost_another: (state, action: PayloadAction<number>) => {
            state.anotherPageData.userPosts.forEach((post: IPost) => {
                if (post.id === action.payload) post.likesCount!++;
            })
        },

        local_unlikePost_another: (state, action: PayloadAction<number>) => {
            state.anotherPageData.userPosts.forEach((post: IPost) => {
                if (post.id === action.payload) post.likesCount!--;
            })
        },

        local_updateAvatar: (state, action: PayloadAction<{img: string, userId: number}>) => {
            state.myPageData.image = action.payload.img;
            state.myThumbnail = action.payload.img;

            state.myPageData.userPosts.forEach((post: IPost, index) => {
                post.authorImage = action.payload.img;
                post.comments.forEach((comment, index) => {
                    if (comment.authorId === action.payload.userId) {
                        comment.image = action.payload.img;
                    }
                })
            })
        },

        setAnotherPageData: (state, action: PayloadAction<IUserPage>) => {
            action.payload.userPosts.forEach((post) => {
                post.authorImage = `data:image/png;base64,${post.authorImage}`;
                post.image = `data:image/png;base64,${post.image}`;
                post.comments.forEach((comment) => {
                    comment.image = `data:image/png;base64,${comment.image}`
                })
            })

            state.anotherPageData = {
                ...action.payload,
                image: `data:image/png;base64,${action.payload.image}`,
            };
        },

        setAnotherSubscribers: (state, action: PayloadAction<IShortUser[]>) => {
            action.payload.forEach(user => {
                user.thumbnail = `data:image/png;base64,${user.thumbnail}`
            })
            state.anotherSubscribers = [...action.payload];
        },
        setAnotherFriends: (state, action: PayloadAction<IShortUser[]>) => {
            action.payload.forEach(user => {
                user.thumbnail = `data:image/png;base64,${user.thumbnail}`
            })
            state.anotherFriends = [...action.payload];
        },
        setAnotherSubscriptions: (state, action: PayloadAction<IShortUser[]>) => {
            action.payload.forEach(user => {
                user.thumbnail = `data:image/png;base64,${user.thumbnail}`
            })
            state.anotherSubscriptions = [...action.payload];
        },

        clearAnotherUser: (state) => {
            state.anotherPageData = initialState.anotherPageData;
            state.anotherSubscribers = initialState.anotherSubscribers;
            state.anotherFriends = initialState.anotherFriends;
            state.anotherSubscriptions = initialState.anotherSubscriptions;
        },

        local_createPostComment: (state, action: PayloadAction<{ comment: IComment, postId: number, place: string }>) => {
            if (action.payload.place === "myPage") {
                state.myPageData.userPosts.forEach((post: IPost) => {
                    if (post.id === action.payload.postId) {
                        post.commentsCount!++;
                        post.comments.push(action.payload.comment);
                    }
                })
            } else if (action.payload.place === "anotherPage") {
                state.anotherPageData.userPosts.forEach((post: IPost) => {
                    if (post.id === action.payload.postId) {
                        post.commentsCount!++;
                        post.comments.push(action.payload.comment);
                    }
                })
            }
        },

        local_subscribe: (state, action: PayloadAction<IShortUser>) => {
            state.mySubscribers.push(action.payload);
            if (state.myPageData.subscribersCount) {
                state.myPageData.subscribersCount++;
            }

            state.anotherSubscribers.push(action.payload);
            if (state.anotherPageData.subscribersCount) {
                state.anotherPageData.subscribersCount++
            }
        },


        resetProfile: () => initialState
    }
})

export const {
    resetProfile,
    setMyPageData,
    setMySubscribers,
    setMyFriends,
    setMySubscriptions,
    editProfile,
    local_createPost,
    setAnotherPageData,
    setAnotherSubscriptions,
    setAnotherSubscribers,
    setAnotherFriends,
    clearAnotherUser,
    local_createPostComment,
    setMyThumbnail,
    local_deletePost, local_unlikePost_another, local_likePost_another,
    local_updateAvatar, local_editPost, local_likePost, local_unlikePost, local_subscribe
} = authSlice.actions;

export default authSlice.reducer;