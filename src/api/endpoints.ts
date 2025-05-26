export const BASE_URL = "http://localhost:5244";

const endpoints = {
    AUTH: {
        LOGIN: BASE_URL + "/api/auth/login",
        REGISTER: BASE_URL + "/api/auth/register",
        LOGOUT: BASE_URL + "/api/auth/logout",
        ME: BASE_URL + "/api/auth/me",
        REFRESH_TOKEN: BASE_URL + "/api/auth/refresh-token",
    },
    PROFILE: {
        CREATE_PROFILE: BASE_URL + "/api/profile/create_profile",
        UPDATE_PROFILE: BASE_URL + "/api/profile/update",
        UPDATE_PICTURE: BASE_URL + "/api/profile/update_picture",
        GET_USER_POSTS: (id: number) => BASE_URL + `/api/profile/${id}/posts`,
        GET_PROFILE: (id: number) =>  BASE_URL + `/api/profile/${id}`,
        GET_PROFILE_PICTURE: (id: number) =>  BASE_URL + `/api/profile/${id}/picture`,

        GET_PROFILE_SUBSCRIBERS: (id: number) =>  BASE_URL + `/api/profile/${id}/subscribers`,
        GET_PROFILE_SUBSCRIPTIONS: (id: number) =>  BASE_URL + `/api/profile/${id}/subscriptions`,
        GET_PROFILE_FRIENDS: (id: number) =>  BASE_URL + `/api/profile/${id}/friends`,

        SUBSCRIBE: (id: number) =>  BASE_URL + `/api/profile/${id}/subscribe`,
        SEARCH: BASE_URL + "/api/profile/search",
    },
    POSTS: {
        CREATE_POST: BASE_URL + "/api/post/create",
        EDIT_POST: (postId: number) => BASE_URL + `/api/post/${postId}`,
        DELETE_POST: (postId: number) => BASE_URL + `/api/post/${postId}`,
        GET_POST: (postId: number) => BASE_URL + `/api/post/${postId}`,
        GET_FEED: BASE_URL + `/api/post/feed`,
        GET_RECOMMENDED: BASE_URL + `/api/post/feed/recommended`,

        LIKE_POST: (postId: number) => BASE_URL + `/api/post/${postId}/like`,
        UNLIKE_POST: (postId: number) => BASE_URL + `/api/post/${postId}/like`,
        GET_POST_LIKES: (postId: number) => BASE_URL + `/api/post/${postId}/likes`,
    },
    COMMENTS: {
        CREATE_COMMENT: (postId: number) => BASE_URL + `/api/comment/post/${postId}`,
        EDIT_COMMENT: (commentId: number) => BASE_URL + `/api/comment/${commentId}`,
        DELETE_COMMENT: (commentId: number) => BASE_URL + `/api/comment/${commentId}`,
    }
    /*FEED: {
        GET_FEED: (size: number, page: number) => BASE_URL + `/feed/main?size=${size}&page=${page}`,
        GET_RECS: (size: number, page: number) => BASE_URL + `/feed/recommended?size=${size}&page=${page}`,
    },
    SUBSCRIPTIONS: BASE_URL + "/user/subscribe",
    ADMIN: {
        GET_USERS: BASE_URL + "/admin/get-users",
        EDIT_USER: BASE_URL + "/admin/edit-user",
        ADD_USER: BASE_URL + "/admin/signup",
        VERIFY_USER: BASE_URL + "/admin/fill-profile",
        DELETE_USER: BASE_URL + "/admin/delete-user",
    }*/
}

export default endpoints;