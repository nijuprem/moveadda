import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState:{
        genreIdOrCategoryName: '',
        searchQuery: '',
        page: 1,
    },
    reducers:{
        selectGenreOrCategory:(state, action) =>{
            state.genreIdOrCategoryName= action.payload;
        },
    },
});

export const { selectGenreOrCategory } = genreOrCategory.actions;

export default genreOrCategory.reducer;