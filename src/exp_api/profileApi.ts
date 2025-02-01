import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/api/endpoints.ts";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL, credentials: "include"}),
    endpoints: (build) => ({
        getProfile: build.query({
            query: (shortname = "") => ({url: `/user/${shortname}`}),
        }),
        getSubscribers: build.query({
            query: (shortname = "") => ({url: `/user/${shortname}/get-subscribers`})
        }),
        getFriends: build.query({
            query: (shortname = "") => ({url: `/user/${shortname}/get-friends`})
        }),
    })
})

export const {useGetProfileQuery, useGetSubscribersQuery, useGetFriendsQuery} = profileApi;