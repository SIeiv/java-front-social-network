import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IWrongResponse} from "@/api/types.ts";
import {IMeUser} from "@/types/userTypes.ts";

const initialState = {
    authData: {
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
        me: null as IMeUser | null,
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
        loginSuccess: (state) => {
            state.authData.isLoading = false;
            state.authData.error = null;
        },
        loginFail: (state, action: PayloadAction<IWrongResponse>) => {
            state.authData.isLoading = false;
            state.authData.error = action.payload.message;
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
        regFail: (state, action: PayloadAction<IWrongResponse>) => {
            state.regData.isLoading = false;
            state.regData.error = action.payload.message;
        },

        setRegisterError: (state, action: PayloadAction<string>) => {
            state.regData.error = action.payload;
        },

        appInitializeStart: (state) => {
            state.appInitializeData.isLoading = true
        },
        appInitializeSuccess: (state, action: PayloadAction<IMeUser>) => {
            state.appInitializeData.initialized = true;
            state.appInitializeData.me = {...action.payload};
            state.appInitializeData.isLoading = false;
        },
        appInitializeFail: (state, action: PayloadAction<IWrongResponse>) => {
            state.appInitializeData.isLoading = false;
            state.appInitializeData.me = null;
            state.appInitializeData.error = action.payload.message;
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