import { axiosInstance } from "@/api/instance.ts";
import {
    ILoginRequest,
    ILoginResponse,
    ILogoutRequest,
    ILogoutResponse, IMeResponse, IRefreshTokenRequest, IRefreshTokenResponse,
    IRegisterRequest,
    IRegisterResponse
} from "@/api/auth/types.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";
import {IWrongResponse} from "@/api/types.ts";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse | IWrongResponse> =>
    axiosInstance.post(endpoints.AUTH.LOGIN, params);

export const logout = (params: ILogoutRequest): AxiosPromise<ILogoutResponse> =>
    axiosInstance.post(endpoints.AUTH.LOGOUT, params);

export const register = (params: IRegisterRequest): AxiosPromise<IRegisterResponse> =>
    axiosInstance.post(endpoints.AUTH.REGISTER, params);

export const me = (): AxiosPromise<IMeResponse> =>
    axiosInstance.get(endpoints.AUTH.ME);

export const refreshToken = (params: IRefreshTokenRequest): AxiosPromise<IRefreshTokenResponse> =>
    axiosInstance.post(endpoints.AUTH.ME, params);