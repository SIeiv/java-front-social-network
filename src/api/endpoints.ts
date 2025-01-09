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
    },
    POSTS: {
        CREATE_POST: BASE_URL + "/posts/create",
        CREATE_POST_COMMENT: BASE_URL + "/comments/create",
    }
}

export default endpoints;