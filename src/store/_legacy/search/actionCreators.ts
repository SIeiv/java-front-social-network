import {Dispatch} from "@reduxjs/toolkit";
import api from "@/api";
import {ISearchRequest} from "@/api/profile/types.ts";
import {setSearchData} from "@/store/search/search.slice.ts";

export const searchAC = (data: ISearchRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await api.profile.search(data);
        dispatch(setSearchData(response.data));
    } catch (error: any) {
        console.error(error);
    }
}