export const BASE_URL = "http://localhost:8080";

const endpoints = {
    AUTH: {
        LOGIN: BASE_URL + "/auth/signin",
        REGISTER: BASE_URL + "/auth/signup",
        LOGOUT: BASE_URL + "/auth/logout",
        GET_DETAILS: BASE_URL + "/auth/details",
    },
    PROFILE: {
        FILL_PROFILE: BASE_URL + "/user/fill-profile",
        GET_MY_PAGE: BASE_URL + "/user/mypage",
        GET_MY_THUMBNAIL: BASE_URL + "/user/mypage/thumbnail",
        UPDATE_AVATAR: BASE_URL + "/user/update-picture",

        SEARCH_PROFILES: BASE_URL + "/user/find",
    },
    POSTS: {
        CREATE_POST: BASE_URL + "/posts/create",
        DELETE_POST: BASE_URL + "/posts/delete",
        EDIT_POST: BASE_URL + "/posts/edit",

        CREATE_POST_COMMENT: BASE_URL + "/comments/create",
        EDIT_POST_COMMENT: BASE_URL + "/comments/edit",
        DELETE_POST_COMMENT: BASE_URL + "/comments/delete",
    },
    FEED: {
        GET_FEED: BASE_URL + "/feed/main",
        GET_RECS: BASE_URL + "/feed/recommended",
    },
    SUBSCRIPTIONS: BASE_URL + "/user/subscribe",
    ADMIN: {
        GET_USERS: BASE_URL + "/admin/get-users",
        EDIT_USER: BASE_URL + "/admin/edit-user",
        ADD_USER: BASE_URL + "/admin/signup",
        VERIFY_USER: BASE_URL + "/admin/fill-profile",
        DELETE_USER: BASE_URL + "/admin/delete-user",
    }
}

export default endpoints;