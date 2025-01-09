import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice.ts"
import newAuthReducer from "./auth/new_auth.slice.ts"

import logger from "redux-logger";
import profileReducer from "./profile/profile.slice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        newAuth: newAuthReducer,
        profile: profileReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(...(process.env.NODE_ENV === "production" ? [logger] : [])),
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']