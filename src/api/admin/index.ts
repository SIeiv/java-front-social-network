import {axiosInstance} from "@/api/instance.ts";
import endpoints from "@/api/endpoints.ts";
import {AxiosPromise} from "axios";
import {
    IAddUserResponse,
    IDeleteUserRequest,
    IEditUserRequest,
    IFillUserRequest,
    IGetUsersResponse
} from "@/api/admin/types.ts";

export const getUsers = (): AxiosPromise<IGetUsersResponse> =>
    axiosInstance.get(endpoints.ADMIN.GET_USERS);

export const editUser = (params: IEditUserRequest): AxiosPromise<string> =>
    axiosInstance.post(endpoints.ADMIN.EDIT_USER, params);

export const addUser = (params: IEditUserRequest): AxiosPromise<IAddUserResponse> =>
    axiosInstance.post(endpoints.ADMIN.ADD_USER, params);

export const fillUser = (params: IFillUserRequest): AxiosPromise<string> =>
    axiosInstance.post(endpoints.ADMIN.VERIFY_USER, params);

export const deleteUser = (params: IDeleteUserRequest): AxiosPromise<string> =>
    axiosInstance.delete(endpoints.ADMIN.DELETE_USER, {data: params, headers: {"Content-Type": "multipart/form-data"}});