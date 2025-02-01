export const BASE_URL = "http://localhost:8080";

const endpoints = {
    AUTH: {
        LOGIN: "/auth/signin",
        REGISTER: "/auth/signup",
        LOGOUT: "/auth/logout",
        GET_DETAILS: "/auth/details",
    },
    PROFILE: {
        FILL_PROFILE: "/user/fill-profile",
        GET_MY_PAGE: "/user/mypage",
        GET_MY_THUMBNAIL: "/user/mypage/thumbnail",
        UPDATE_AVATAR: "/user/update-picture",

        SEARCH_PROFILES: "/user/find",
    },
    POSTS: {
        CREATE_POST: "/posts/create",
        DELETE_POST: "/posts/delete",
        EDIT_POST: "/posts/edit",

        CREATE_POST_COMMENT: "/comments/create",
        EDIT_POST_COMMENT: "/comments/edit",
        DELETE_POST_COMMENT: "/comments/delete",
    },
    FEED: {
        GET_FEED: "/feed/main",
        GET_RECS: "/feed/recommended",
    },
    SUBSCRIPTIONS: "/user/subscribe",
    ADMIN: {
        GET_USERS: "/admin/get-users",
        EDIT_USER: "/admin/edit-user",
        ADD_USER: "/admin/signup",
        VERIFY_USER: "/admin/fill-profile",
        DELETE_USER: "/admin/delete-user",
    }
}

export default endpoints;