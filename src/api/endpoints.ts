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
    },
    POSTS: {
        CREATE_POST: BASE_URL + "/posts/create",
        CREATE_POST_COMMENT: BASE_URL + "/comments/create",
        DELETE_POST: BASE_URL + "/posts/delete",
    },
    FEED: {
        GET_FEED: BASE_URL + "/feed/main",
        GET_RECS: BASE_URL + "/feed/recommended",
    }
}

export default endpoints;