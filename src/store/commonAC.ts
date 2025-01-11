import {Dispatch} from "@reduxjs/toolkit";
import {resetAuth} from "@/store/auth/auth.slice.ts";
import {resetProfile} from "@/store/profile/profile.slice.ts";
import {appInitializeAC} from "@/store/auth/actionCreators.ts";
import {resetNewAuth} from "@/store/auth/new_auth.slice.ts";
import {resetFeed} from "@/store/feed/feed.slice.ts";


export const resetAll = () => async (dispatch: Dispatch) => {
    dispatch(resetAuth());
    dispatch(resetNewAuth());
    dispatch(resetFeed())
    dispatch(resetProfile());
    dispatch(appInitializeAC());
}