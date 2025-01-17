import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {IShortUser} from "@/types.ts";
import {ISearchRequest} from "@/api/profile/types.ts";



const initialState = {
    searchData: [] as IShortUser[],
    field: ""
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchData: (state, action: PayloadAction<IShortUser[]>) => {
            action.payload.forEach((item) => {
                item.thumbnail = `data:image/png;base64,${item.thumbnail}`
            })

            state.searchData = [...action.payload];
        },

        setField: (state, action: PayloadAction<string>) => {
            state.field = action.payload;
        },

        resetSearch: () => initialState
    }
})

export const {
    setSearchData, resetSearch, setField
} = searchSlice.actions;

export default searchSlice.reducer;