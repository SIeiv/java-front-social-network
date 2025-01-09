import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IComment, IPost, IShortUser, IUserPage} from "@/types.ts";
import {IFillProfileRequest} from "@/api/profile/types.ts";
import {ICreatePostCommentRequest} from "@/api/posts/types.ts";


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

        editProfile: (state, action: PayloadAction<IFillProfileRequest>) => {
            state.myPageData.firstName = action.payload.firstName;
            state.myPageData.lastName = action.payload.lastName;
            state.myPageData.shortName = action.payload.shortName;
            state.myPageData.dateOfBirth = action.payload.birthDate;
            state.myPageData.gender = action.payload.gender;
            state.myPageData.image = action.payload.avatar;
        },

        local_createPost: (state, action: PayloadAction<IPost>) => {
            state.myPageData.userPosts.push(action.payload);
        },

        local_likePost: (state, action: PayloadAction<IPost>) => {
            state.myPageData.userPosts.push(action.payload);
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

        local_createPostComment: (state, action: PayloadAction<{ comment: IComment, postId: number }>) => {
            state.myPageData.userPosts.forEach((post: IPost) => {
                if (post.id === action.payload.postId) {
                    post.commentsCount!++;
                    post.comments.push(action.payload.comment);
                }
            })
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
    local_createPostComment
} = authSlice.actions;

export default authSlice.reducer;