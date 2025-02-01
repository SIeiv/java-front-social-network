import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice.ts"
import newAuthReducer from "./auth/new_auth.slice.ts"

import profileReducer from "./profile/profile.slice.ts";
import feedReducer from "./feed/feed.slice.ts";
import searchReducer from "./search/search.slice.ts";
import adminReducer from "./admin/admin.slice.ts";
import {profileApi} from "@/exp_api/profileApi.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        newAuth: newAuthReducer,
        profile: profileReducer,
        feed: feedReducer,
        search: searchReducer,
        admin: adminReducer,

        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(profileApi.middleware),
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']