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
            state.searchQuery='';
        },
        searchMovie: (state, action)=>{
            state.searchQuery= action.payload;
        },
    },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;