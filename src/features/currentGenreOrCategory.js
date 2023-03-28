import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState:{
        genreOrCategory: '',
        searchQuery: '',
        page: 1,
    },
    reducers:{
        selectGenreOrCategory:(state, action) =>{
            
        },
    },
});

export const { selectGenreOrCategory } = genreOrCategory.actions;

export default genreOrCategory.reducer;