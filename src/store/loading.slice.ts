import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {
    profile: {
        pageLoading: false,
        subscribersLoading: false,
        friendsLoading: false,
        subscriptionsLoading: false,
    },
    feedLoading: false,
    feedAppendLoading: false,
    adminUsersLoading: false,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setPageLoading: (state, action: PayloadAction<boolean>) => {
            state.profile.pageLoading = action.payload;
        },

        setSubscribersLoading: (state, action: PayloadAction<boolean>) => {
            state.profile.subscribersLoading = action.payload;
        },

        setFriendsLoading: (state, action: PayloadAction<boolean>) => {
            state.profile.friendsLoading = action.payload;
        },

        setSubscriptionsLoading: (state, action: PayloadAction<boolean>) => {
            state.profile.subscriptionsLoading = action.payload;
        },

        setFeedLoading: (state, action: PayloadAction<boolean>) => {
            state.feedLoading = action.payload;
        },

        setFeedAppendLoading: (state, action: PayloadAction<boolean>) => {
            state.feedAppendLoading = action.payload;
        },

        setAdminUsersLoading: (state, action: PayloadAction<boolean>) => {
            state.adminUsersLoading = action.payload;
        },

        resetLoading: () => initialState
    }
})

export const {
    resetLoading, setPageLoading, setSubscribersLoading, setSubscriptionsLoading, setFriendsLoading, setFeedLoading,
    setAdminUsersLoading, setFeedAppendLoading
} = loadingSlice.actions;

export default loadingSlice.reducer;