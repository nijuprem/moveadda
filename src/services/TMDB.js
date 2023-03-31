import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey= process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder) =>({

        // Get genre by type
        getGenre: builder.query({
            query: () =>`genre/movie/list?api_key=${tmdbApiKey}`
        }),

        // Get List of favourites
        getList:builder.query({
            query: ({listName, accountId, sessionId, page})=> `/account/${accountId}/${listName}/movies?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
        }),

        // Get Movies by type
        getMovies: builder.query({
            query: ({genreIdOrCategoryName, page, searchQuery})=> {
                // Movies by search
                if(searchQuery){
                    return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }

                // Get category by name
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName==='string'){
                    console.log('Category')
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }

                // Get genre by name
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName==='number'){
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                }
                // Get popular Movies
                console.log('Outside')
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),
        // Get Movie for main movie page
        getMovie: builder.query({
            query: (id)=> `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}` 
        }),

        // Get user specific list/ recommendations
        getRecommendations: builder.query({
            query: ({movie_id, list})=>`/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        }),
        // Get actor details
        getActorDetails: builder.query({
            query: (id) => `person/${id}?api_key=${tmdbApiKey}`
        }),

        // Get Movies by actor
        getMoviesByActorId: builder.query({
            query: ({id, page}) => `discover/movie/?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
        })
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenreQuery,
    useGetMovieQuery,
    useGetListQuery,
    useGetRecommendationsQuery,
    useGetActorDetailsQuery,
    useGetMoviesByActorIdQuery,
} = tmdbApi;