import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFullProfile} from "@/types/ProfileTypes.ts";
import {formatAvatarPath, formatPostImagesPath} from "@/helpers.ts";
import {ILinkedUsersResponse} from "@/api/profile/types.ts";
import {IPost} from "@/types/PostTypes.ts";
import {ICreatePostResponse} from "@/api/posts/types.ts";


const initialState = {
    myAvatarPath: null as null | string,

    userPageData: {} as IFullProfile,
    userPosts: null as IPost[] | null,
    userSubscribers: [] as IFullProfile[],
    userFriends: [] as IFullProfile[],
    userSubscriptions: [] as IFullProfile[],
}

export const authSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserPageData: (state, action: PayloadAction<IFullProfile>) => {
            state.userPageData = {...action.payload, avatarPath: formatAvatarPath(action.payload.avatarPath)};
        },

        setMyAvatarPath: (state, action: PayloadAction<string>) => {
            state.myAvatarPath = formatAvatarPath(action.payload);
        },

        setMyPosts: (state, action: PayloadAction<IPost[]>) => {
            state.userPosts = formatPostImagesPath(action.payload);
        },

        setUserSubscribers: (state, action: PayloadAction<ILinkedUsersResponse>) => {
            const subs = action.payload.map(sub => {
                return {...sub, avatarPath: formatAvatarPath(sub.avatarPath)};
            })
            state.userSubscribers = subs;
        },
        setUserFriends: (state, action: PayloadAction<ILinkedUsersResponse>) => {
            const friends = action.payload.map(friend => {
                return {...friend, avatarPath: formatAvatarPath(friend.avatarPath)};
            })
            state.userFriends = friends;
        },
        setUserSubscriptions: (state, action: PayloadAction<ILinkedUsersResponse>) => {
            const subscript = action.payload.map(s => {
                return {...s, avatarPath: formatAvatarPath(s.avatarPath)};
            })
            state.userSubscriptions = subscript;
        },

        local_updateAvatar: (state, action: PayloadAction<{img: string, userId: number}>) => {
            state.userPageData.avatarPath = action.payload.img;
            state.myAvatarPath = action.payload.img;

            state.userPosts && state.userPosts.forEach((post: IPost) => {
                post.author.avatarPath = action.payload.img;
                post.comments.forEach((comment) => {
                    if (comment.authorId === action.payload.userId) {
                        comment.image = action.payload.img;
                    }
                })
            })
        },

        local_createPost: (state, action: PayloadAction<ICreatePostResponse>) => {
            const post = formatPostImagesPath([action.payload])[0];
            state.userPosts && (state.userPosts = [post, ...state.userPosts]);
        },

        /*setMyPageData: (state, action: PayloadAction<IUserPage>) => {
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

        editProfile: (state, action: PayloadAction<any>) => {
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

        local_editPost: (state, action: PayloadAction<{postData: IEditPostRequest, place: string}>) => {
            if (action.payload.place === "myPage") {
                state.myPageData.userPosts.forEach((post: IPost) => {
                    if (post.id === action.payload.postData.postId && post.profileId === action.payload.postData.profileId) {
                        post.content = action.payload.postData.content;
                        if (post.image) {
                            post.image = action.payload.postData.image;
                        }
                    }
                })
            } else {
                state.anotherPageData.userPosts.forEach((post: IPost) => {
                    if (post.id === action.payload.postData.postId && post.profileId === action.payload.postData.profileId) {
                        post.content = action.payload.postData.content;
                        if (post.image) {
                            post.image = action.payload.postData.image;
                        }
                    }
                })
            }
        },

        local_deletePost: (state,
                           action: PayloadAction<{request: IDeletePostRequest, place: string}>) => {
            if (action.payload.place === "myPage") {
                state.myPageData.userPosts.forEach((post: IPost, index) => {
                    if (post.id === action.payload.request.postId) {
                        state.myPageData.userPosts.splice(index, 1);
                    }
                })
            } else {
                state.anotherPageData.userPosts.forEach((post: IPost, index) => {
                    if (post.id === action.payload.request.postId) {
                        state.anotherPageData.userPosts.splice(index, 1);
                    }
                })
            }
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

            state.myPageData.userPosts.forEach((post: IPost) => {
                post.authorImage = action.payload.img;
                post.comments.forEach((comment) => {
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

        local_editPostComment: (state, action: PayloadAction<{comment: IComment, postId: number, place: string }>) => {
            if (action.payload.place === "myPage") {
                state.myPageData.userPosts.forEach((post: IPost) => {
                    if (post.id === action.payload.postId) {
                        post.comments.forEach((comment: IComment) => {
                            if (comment.id === action.payload.comment.id) {
                                comment.content = action.payload.comment.content;
                            }
                        })
                    }
                })
            } else if (action.payload.place === "anotherPage") {
                state.anotherPageData.userPosts.forEach((post: IPost) => {
                    if (post.id === action.payload.postId) {
                        post.comments.forEach((comment: IComment) => {
                            if (comment.id === action.payload.comment.id) {
                                comment.content = action.payload.comment.content;
                            }
                        })
                    }
                })
            }
        },

        local_deletePostComment: (state, action: PayloadAction<{comment: IComment, postId: number, place: string }>) => {
            if (action.payload.place === "myPage") {
                state.myPageData.userPosts.forEach((post: IPost) => {
                    if (post.id === action.payload.postId) {
                        post.commentsCount!--;
                        post.comments.forEach((comment: IComment, index) => {
                            if (comment.id === action.payload.comment.id) {
                                post.comments.splice(index, 1);
                            }
                        })
                    }
                })
            } else if (action.payload.place === "anotherPage") {
                state.anotherPageData.userPosts.forEach((post: IPost) => {
                    if (post.id === action.payload.postId) {
                        post.commentsCount!--;
                        post.comments.forEach((comment: IComment, index) => {
                            if (comment.id === action.payload.comment.id) {
                                post.comments.splice(index, 1);
                            }
                        })
                    }
                })
            }
        },

        local_subscribe: (state, action: PayloadAction<{currentUser: IShortUser, anotherUser: IShortUser}>) => {
            let isAnotherUserSubscribed = false;
            for (let i = 0; i < state.anotherSubscriptions.length; i++) {
                if (state.anotherSubscriptions[i].shortName === action.payload.currentUser.shortName) {
                    isAnotherUserSubscribed = true;
                    break;
                }
            }

            if (!isAnotherUserSubscribed) {
                state.mySubscriptions.push(action.payload.anotherUser);
                if (state.myPageData.subscriptionsCount) {
                    state.myPageData.subscriptionsCount++;
                }

                state.anotherSubscribers.push(action.payload.currentUser);
                if (state.anotherPageData.subscribersCount) {
                    state.anotherPageData.subscribersCount++
                }
            } else {
                state.myFriends.push(action.payload.anotherUser);
                if (state.myPageData.friendsCount) {
                    state.myPageData.friendsCount++;
                }
                state.mySubscribers.forEach((subscriber, index) => {
                    if (subscriber.shortName === action.payload.anotherUser.shortName) {
                        state.mySubscribers.splice(index, 1);
                    }
                })

                state.anotherFriends.push(action.payload.currentUser);
                if (state.anotherPageData.friendsCount) {
                    state.anotherPageData.friendsCount++
                }
                state.anotherSubscriptions.forEach((subscription, index) => {
                    if (subscription.shortName === action.payload.currentUser.shortName) {
                        state.anotherSubscriptions.splice(index, 1);
                    }
                })
                if (state.anotherPageData.subscriptionsCount) {
                    state.anotherPageData.subscriptionsCount--;
                }
            }

        },

        local_unsubscribe: (state, action: PayloadAction<{currentUser: IShortUser, anotherUser: IShortUser}>) => {
            let isAnotherUserSubscribed = false;
            for (let i = 0; i < state.anotherSubscriptions.length; i++) {
                if (state.anotherSubscriptions[i].shortName === action.payload.currentUser.shortName) {
                    isAnotherUserSubscribed = true;
                    break;
                }
            }
            for (let i = 0; i < state.anotherFriends.length; i++) {
                if (state.anotherFriends[i].shortName === action.payload.currentUser.shortName) {
                    isAnotherUserSubscribed = true;
                    break;
                }
            }

            if (!isAnotherUserSubscribed) {
                state.mySubscriptions.forEach((subscription, index) => {
                    if (subscription.shortName === action.payload.anotherUser.shortName) {
                        state.mySubscriptions.splice(index, 1);
                    }
                })
                if (state.myPageData.subscriptionsCount) {
                    state.myPageData.subscriptionsCount--;
                }

                state.anotherSubscribers.forEach((subscriber, index) => {
                    if (subscriber.shortName === action.payload.currentUser.shortName) {
                        state.anotherSubscribers.splice(index, 1);
                    }
                })
                if (state.anotherPageData.subscribersCount) {
                    state.anotherPageData.subscribersCount--;
                }
            } else {
                state.myFriends.forEach((friend, index) => {
                    if (friend.shortName === action.payload.anotherUser.shortName) {
                        state.myFriends.splice(index, 1);
                    }
                })
                if (state.myPageData.friendsCount) {
                    state.myPageData.friendsCount--;
                }
                state.mySubscribers.push(action.payload.anotherUser);

                state.anotherFriends.forEach((friend, index) => {
                    if (friend.shortName === action.payload.currentUser.shortName) {
                        state.anotherFriends.splice(index, 1);
                    }
                })
                if (state.anotherPageData.friendsCount) {
                    state.anotherPageData.friendsCount--
                }
                state.anotherSubscriptions.push(action.payload.currentUser);
                if (state.anotherPageData.subscriptionsCount) {
                    state.anotherPageData.subscriptionsCount++
                }
            }

        },*/


        resetProfile: () => initialState
    }
})

export const {
    resetProfile,
    setMyAvatarPath,
    setMyPosts,
    setUserFriends,
    setUserSubscribers,
    setUserSubscriptions,
    setUserPageData,
    local_updateAvatar,
    local_createPost
} = authSlice.actions;

export default authSlice.reducer;