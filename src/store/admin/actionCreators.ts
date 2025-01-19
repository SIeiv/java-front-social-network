import {Dispatch} from "@reduxjs/toolkit";
import api from "@/api";
import {local_addUser, local_editUser, local_fillUser, setUsers} from "@/store/admin/admin.slice.ts";
import {IEditUserRequest, IFillUserRequest} from "@/api/admin/types.ts";

export const admin_getUsersAC = () => async (dispatch: Dispatch) => {
    try {
        const response = await api.admin.getUsers();
        dispatch(setUsers(response.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const admin_editUserAC = (data: IEditUserRequest, userId: number) => async (dispatch: Dispatch) => {
    try {
        await api.admin.editUser(data);
        dispatch(local_editUser({data, userId}));
    } catch (error: any) {
        console.error(error);
    }
}

export const admin_addUserAC = (data: IEditUserRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await api.admin.addUser(data);
        dispatch(local_addUser(response.data));
    } catch (error: any) {
        console.error(error);
    }
}

export const admin_fillUserAC = (data: IFillUserRequest) => async (dispatch: Dispatch) => {
    try {
        await api.admin.fillUser(data)
        dispatch(local_fillUser(data));
    } catch (error: any) {
        console.error(error);
    }
}