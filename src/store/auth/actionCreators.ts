import {ILoginRequest, ILoginResponse, IMeResponse, IRegisterRequest, IRegisterResponse} from "@/api/auth/types.ts";
import {Dispatch} from "@reduxjs/toolkit";
import {
    appInitializeFail,
    appInitializeStart, appInitializeSuccess,
    loginFail,
    loginStart,
    loginSuccess, logoutFail, logoutStart, logoutSuccess, regFail, regStart, regSuccess,
} from "@/store/auth/auth.slice.ts";
import api from "../../api";
import {IWrongResponse} from "@/api/types.ts";
import {toast} from "sonner";

export const loginAC =
    (data: ILoginRequest) => async (dispatch: Dispatch) => {
        try {
            dispatch(loginStart());

            const response = await api.auth.login(data);
            const resData = response.data as ILoginResponse;

            localStorage.setItem("accessToken", resData.accessToken);
            localStorage.setItem("refreshToken", resData.refreshToken);
            localStorage.setItem("expiresAt", resData.expiresAt.toString());
            await dispatch(appInitializeAC());

            dispatch(loginSuccess());
        } catch (e: any) {
            dispatch(loginFail(e.response ? e.response.data as IWrongResponse : e.message));
        }
    }

export const logoutAC =
    () => async (dispatch: Dispatch) => {
        try {
            dispatch(logoutStart());

            const response = await api.auth.logout({refreshToken: localStorage.getItem("refreshToken")});

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("expiresAt");

            dispatch(logoutSuccess());
        } catch (e: any) {
            console.error(e);
            dispatch(logoutFail(e.response ? e.response.data.message : e.message));
        }
    }

export const registerAC = (data: IRegisterRequest) => async (dispatch: Dispatch) => {
    try {
        dispatch(regStart())

        const response = await api.auth.register(data);
        const resData = response.data as IRegisterResponse;

        localStorage.setItem("accessToken", resData.accessToken);
        localStorage.setItem("refreshToken", resData.refreshToken);
        localStorage.setItem("expiresAt", resData.expiresAt.toISOString());

        dispatch(regSuccess());
    } catch (e: any) {
        console.error(e);
        dispatch(regFail(e.response ? e.response.data as IWrongResponse : e.message));
    }
}

export const appInitializeAC =
    () => async (dispatch: Dispatch) => {
        try {
            dispatch(appInitializeStart());

            const response = await api.auth.me();
            const resData = response.data as IMeResponse;

            dispatch(appInitializeSuccess(resData.user));
        } catch (e: any) {
            if (e.status !== 401) {
                toast(`Ошибка: ${e.message}`);
            }
            dispatch(appInitializeFail(e.response ? e.response.data : e.message));
        }
    }

/*export const getDetailsAC = () => async (dispatch: Dispatch) => {
    try {

        const response = await api.auth.getDetails();

        if (response.status === 200) {
            console.log("getDetails ", response);
            dispatch(setUserDetails(response.data));
        }

    } catch (error: any) {
        console.error(error);
    }
}

export const loginUser =
    (data: ILoginRequest) => async (dispatch: Dispatch) => {
        try {
            dispatch(loginStart());

            const response = await api.auth.login(data);

            if (response.status === 200) {
                console.log(response);
                dispatch(loginSuccess(response.data));
                await dispatch(getDetailsAC());

                const verified = store.getState().newAuth.userData.verified;

                if (verified) {
                    window.location.href = "/my-page";
                } else {
                    window.location.href = "/fill-profile";
                }
            }

        } catch (e: any) {
            console.error(e);
            dispatch(loginFail(e.response ? e.response.data : e.message));
        }
    }

export const appInitializeAC =
    () => async (dispatch: Dispatch) => {
        try {
            dispatch(appInitializeStart());

            const response = await api.auth.getDetails();

            dispatch(appInitializeSuccess(response.data));
        } catch (e: any) {
            console.error(e);
            dispatch(appInitializeFail(e.response ? e.response.data : e.message));
        }
    }

export const logoutUser =
    () => async (dispatch: Dispatch) => {
        try {
            dispatch(logoutStart());

            const response = await api.auth.logout();

            console.log(response);
            dispatch(logoutSuccess());

        } catch (e: any) {
            console.error(e);
            dispatch(logoutFail(e.response ? e.response.data : e.message));
        }
    }

export const registerUser = (data: IRegisterRequest) => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch(regStart());

        const response = await api.auth.register(data);

        console.log(response);
        dispatch(regSuccess());
    } catch (e: any) {
        console.error(e);
        dispatch(regFail(e.response ? e.response.data : e.message));
    }
}*/
