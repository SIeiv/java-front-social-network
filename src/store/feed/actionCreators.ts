import {Dispatch} from "@reduxjs/toolkit";
import api from "@/api";
import {setFeed, setRecommended} from "@/store/feed/feed.slice.ts";

export const getFeedAC = () => async (dispatch: Dispatch) => {
    try {
        const response = await api.feed.getFeed();
        dispatch(setFeed(response.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const getRecommendedAC = () => async (dispatch: Dispatch) => {
    try {
        const response = await api.feed.getRecommended();
        dispatch(setRecommended(response.data));
    } catch (error: any) {
        console.error(error);
    }
}