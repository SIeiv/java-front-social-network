import { axiosInstance } from "@/api/instance.ts";
import {IDetailsResponse, ILoginRequest, IRegisterRequest} from "@/api/auth/types.ts";
import {AxiosPromise} from "axios";
import endpoints from "@/api/endpoints.ts";

export const login = (params: ILoginRequest): AxiosPromise<string> =>
    axiosInstance.post(endpoints.AUTH.LOGIN, params);

export const logout = () =>
    axiosInstance.get(endpoints.AUTH.LOGOUT);

export const register = (params: IRegisterRequest) =>
    axiosInstance.post(endpoints.AUTH.REGISTER, params);

export const getDetails = (): AxiosPromise<IDetailsResponse> =>
    axiosInstance.get(endpoints.AUTH.GET_DETAILS);