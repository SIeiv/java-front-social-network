import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice.ts"
import newAuthReducer from "./auth/new_auth.slice.ts"

import logger from "redux-logger";
import profileReducer from "./profile/profile.slice.ts";
import feedReducer from "./feed/feed.slice.ts";
import searchReducer from "./search/search.slice.ts";
import adminReducer from "./admin/admin.slice.ts";
import loadingReducer from "./loading.slice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        newAuth: newAuthReducer,
        profile: profileReducer,
        feed: feedReducer,
        search: searchReducer,
        admin: adminReducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(...(process.env.NODE_ENV === "production" ? [logger] : [])),
});


export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];