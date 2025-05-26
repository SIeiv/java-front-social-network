import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {formatAvatarPath} from "@/helpers.ts";
import {ICreateCommentResponse} from "@/api/comments/types.ts";
import {IComment} from "@/types/CommentTypes.ts";
import {IFullProfile} from "@/types/ProfileTypes.ts";
import {ISearchResponse} from "@/api/profile/types.ts";

const initialState = {
    searchData: [] as IFullProfile[],
    searchField: "" as string,
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchData: (state, action: PayloadAction<ISearchResponse>) => {
            const result = action.payload.map((item) => ({
                ...item, avatarPath: formatAvatarPath(item.avatarPath),
            }));
            state.searchData = result;
        },

        resetSearch: () => initialState
    }
})

export const {
    setSearchData,
    resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;