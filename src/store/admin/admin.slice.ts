import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IDetailsResponse} from "@/api/auth/types.ts";
import {IAddUserResponse, IEditUserRequest, IFillUserRequest} from "@/api/admin/types.ts";

const initialState = {
    users: [] as IDetailsResponse[]
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IDetailsResponse[]>) => {
            state.users = [...action.payload];
        },

        local_editUser: (state, action: PayloadAction<{data: IEditUserRequest, userId: number}>) => {
            state.users.forEach((user: IDetailsResponse) => {
                if (user.id === action.payload.userId) {
                    user.username = action.payload.data.username;
                    user.email = action.payload.data.email;
                    user.role = action.payload.data.role;
                }
            })
        },

        local_fillUser: (state, action: PayloadAction<IFillUserRequest>) => {
            state.users.forEach((user: IDetailsResponse) => {
                if (user.profileId === action.payload.id) {
                    user.firstname = action.payload.firstName;
                    user.lastname = action.payload.lastName;
                    user.shortname = action.payload.shortName;
                    user.verified = true;
                }
            })
        },

        local_addUser: (state, action: PayloadAction<IAddUserResponse>) => {
            const user: IDetailsResponse = {
                ...action.payload,
                shortname: action.payload.shortname ? action.payload.shortname : "",
                firstname: action.payload.firstname ? action.payload.firstname : "",
                lastname: action.payload.lastname ? action.payload.lastname : "",
            }

            state.users.push(user);
        },

        local_deleteUser: (state, action: PayloadAction<number>) => {
            state.users.forEach((user: IDetailsResponse, index) => {
                if (user.id === action.payload) {
                    state.users.splice(index, 1);
                }
            })
        },

        resetAdmin: () => initialState
    }
})

export const {
    resetAdmin, setUsers, local_editUser, local_addUser, local_fillUser, local_deleteUser
} = adminSlice.actions;

export default adminSlice.reducer;