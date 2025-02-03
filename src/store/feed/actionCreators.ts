import {Dispatch} from "@reduxjs/toolkit";
import api from "@/api";
import {appendFeed, setFeed, setRecommended} from "@/store/feed/feed.slice.ts";
import {setFeedAppendLoading, setFeedLoading} from "@/store/loading.slice.ts";

export const getFeedAC = (size: number, page: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setFeedLoading(true));
        const response = await api.feed.getFeed(size, page);
        dispatch(setFeed(response.data));
        dispatch(setFeedLoading(false));
    } catch (error: any) {
        console.error(error);
    }
}

export const appendFeedAC = (size: number, page: number) => async (dispatch: Dispatch) => {
    try {
        const response = await api.feed.getFeed(size, page);
        dispatch(appendFeed(response.data));
        dispatch(setFeedAppendLoading(false));
    } catch (error: any) {
        console.error(error);
    }
}

export const getRecommendedAC = (size: number, page: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setFeedLoading(true));
        const response = await api.feed.getRecommended(size, page);
        dispatch(setRecommended(response.data));
        dispatch(setFeedLoading(false));
    } catch (error: any) {
        console.error(error);
    }
}