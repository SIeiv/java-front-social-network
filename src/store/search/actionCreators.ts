import {ISearchRequest} from "@/api/profile/types.ts";
import {AppDispatch} from "@/store";
import api from "@/api";
import {setSearchData} from "@/store/search/search.slice.ts";

export const searchAC = (data: ISearchRequest) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.profile.search(data);
        dispatch(setSearchData(response.data));
    } catch (error: any) {
        console.error(error);
    }
}