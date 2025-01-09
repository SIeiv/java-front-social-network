import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDetailsResponse} from "@/api/auth/types.ts";

const initialState = {
    userData: {
        id: null as null | number,
        username: null as null | string,
        profileId: null as null | number,
        verified: null as null | boolean,
    }
}

export const authSlice = createSlice({
    name: 'new_auth',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<IDetailsResponse>) => {
            state.userData = {...action.payload};
        },

        setUserVerified: (state, action: PayloadAction<boolean>) => {
            state.userData.verified = action.payload;
        },

        resetNewAuth: () => initialState
    }
})

export const {
    resetNewAuth, setUserDetails, setUserVerified
} = authSlice.actions;

export default authSlice.reducer;