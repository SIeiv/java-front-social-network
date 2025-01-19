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
    profileData: {
        profile: null as null,
        isLoading: false as boolean,
        error: null as null | string,
        role: null as null | "ROLE_USER" | "ROLE_ADMIN" | "ROLE_MODERATOR",
        id: null as null | number,
    },

    getAllUsersData: {
        allUsers: null as null,
        isLoading: false as boolean
    },

    avatarData: {
        avatar: null as null | string,
        isLoading: false as boolean,
        error: null as null | string
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

        loadProfileStart: (state) => {
            state.profileData.isLoading = true;
        },
        loadProfileSuccess: (state, action) => {
            state.profileData.profile = action.payload.profile;
            state.profileData.role = action.payload.role;
            state.profileData.id = action.payload.id;
            state.profileData.isLoading = false;
            state.profileData.error = null;
        },
        loadProfileFail: (state, action: PayloadAction<string>) => {
            state.profileData.isLoading = false;
            state.profileData.error = action.payload;
        },

        getAllUsersStart: (state) => {
            state.getAllUsersData.isLoading = true;
        },
        getAllUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
            state.getAllUsersData.allUsers = action.payload;
            state.getAllUsersData.isLoading = false;
        },

        clearProfileData: (state) => {
            state.authData.accessToken = null;
            state.profileData.profile = null;
            state.avatarData.avatar = null;
        },
        avatarStart: (state) => {
            state.avatarData.isLoading = true
        },
        avatarSuccess: (state, action: PayloadAction<string>) => {
            state.avatarData.avatar = action.payload;
            state.avatarData.isLoading = false;
        },
        avatarFail: (state, action: PayloadAction<string>) => {
            state.avatarData.isLoading = false;
            state.avatarData.error = action.payload;
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

        localUpdateUser: (state, action: PayloadAction<IUser>) => {
            if (state.getAllUsersData.allUsers) {
                state.getAllUsersData.allUsers.forEach(item => {
                    if (item.id === action.payload.id) {
                        item.email = action.payload.email;
                        item.roles = action.payload.roles;
                        item.username = action.payload.username;
                    }
                })
            }
        },

        localDeleteUser: (state, action: PayloadAction<IDeleteUserRequest>) => {
            state.getAllUsersData.allUsers!.forEach((user, index) => {
                if (user.id === action.payload.id) {
                    state.getAllUsersData.allUsers!.splice(index, 1);
                }
            })
        },

        localAddUser: (state, action: PayloadAction<IAddUserRequest>) => {
            state.getAllUsersData.allUsers!.push({
                id: action.payload.id,
                email: action.payload.email,
                roles: action.payload.roles,
                username: action.payload.username,
            });
        },

        resetAuth: () => initialState
    }
})

export const {
    loginStart, loginSuccess,
    loginFail, loadProfileStart,
    loadProfileSuccess, loadProfileFail,
    regFail, regSuccess,
    avatarFail, avatarStart,
    regStart, avatarSuccess,
    clearProfileData, setRegisterError,
    logoutStart, getAllUsersStart, getAllUsersSuccess,
    logoutSuccess, logoutFail, appInitializeStart, appInitializeSuccess,
    appInitializeFail, localUpdateUser, resetAuth,
    localDeleteUser, localAddUser
} = authSlice.actions;

export default authSlice.reducer;