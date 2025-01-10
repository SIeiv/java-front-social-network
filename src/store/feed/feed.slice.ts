import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFeed, IRecommended} from "@/types.ts";


const initialState = {
    feed: [] as IFeed,

    recommended: {
        profiles: [],
        posts: []
    } as IRecommended,
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setFeed: (state, action: PayloadAction<IFeed>) => {
            state.feed = [...action.payload];
        },

        setRecommended: (state, action: PayloadAction<IRecommended>) => {
            state.recommended = {...action.payload};
        },

        resetFeed: () => initialState
    }
})

export const {
    resetFeed, setFeed, setRecommended
} = feedSlice.actions;

export default feedSlice.reducer;