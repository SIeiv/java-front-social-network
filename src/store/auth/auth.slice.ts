import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDetailsResponse} from "@/api/auth/types.ts";

const initialState = {
    authData: {
        accessToken: null as null | string,
        isLoading: false as boolean,
        error: null as null | string,
    },
    logoutData: {
        isLoading: false as boolean,
        error: null as null | string,
    },
    regData: {
        isLoading: false as boolean,
        error: null as null | string,
    },

    appInitializeData: {
        initialized: false,
        initialUserData: 1 as number | null | IDetailsResponse,
        isLoading: true as boolean,
        error: null as null | string
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.authData.isLoading = true;
        },
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.authData.accessToken = action.payload;
            state.authData.isLoading = false;
            state.authData.error = null;
        },
        loginFail: (state, action: PayloadAction<string>) => {
            state.authData.isLoading = false;
            state.authData.error = action.payload;
        },

        logoutStart: (state) => {
            state.logoutData.isLoading = true;
        },
        logoutSuccess: (state) => {
            state.logoutData.isLoading = false;
            state.logoutData.error = null;
        },
        logoutFail: (state, action: PayloadAction<string>) => {
            state.logoutData.isLoading = false;
            state.logoutData.error = action.payload;
        },

        regStart: (state) => {
            state.regData.isLoading = true;
        },
        regSuccess: (state) => {
            state.regData.isLoading = false;
            state.regData.error = null;
        },
        regFail: (state, action: PayloadAction<string>) => {
            state.regData.isLoading = false;
            state.regData.error = action.payload;
        },

        setRegisterError: (state, action: PayloadAction<string>) => {
            state.regData.error = action.payload;
        },

        appInitializeStart: (state) => {
            state.appInitializeData.isLoading = true
        },
        appInitializeSuccess: (state, action: PayloadAction<IDetailsResponse>) => {
            state.appInitializeData.initialized = true;
            state.appInitializeData.initialUserData = {...action.payload};
            state.appInitializeData.isLoading = false;
        },
        appInitializeFail: (state, action: PayloadAction<string>) => {
            state.appInitializeData.isLoading = false;
            state.appInitializeData.initialUserData = null;
            state.appInitializeData.error = action.payload;
        },

        resetAuth: () => initialState
    }
})

export const {
    loginStart, loginSuccess,
    loginFail,
    regFail, regSuccess,
    regStart,
    setRegisterError,
    logoutStart,
    logoutSuccess, logoutFail, appInitializeStart, appInitializeSuccess,
    appInitializeFail, resetAuth,
} = authSlice.actions;

export default authSlice.reducer;