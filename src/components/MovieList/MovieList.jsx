import React from 'react';
import { Grid } from '@mui/material';

import useStlyes from './styles'
import Movie from '../Movie/Movie';

const MovieList = ({movies, numberOfMovies, excludeFirst}) => {

    const classes= useStlyes();
    const startFrom = excludeFirst? 1 : 0;

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i)=>(
        <Movie key={i} i={i} movie={movie} />
      ))}
    </Grid>
  )
}

export default MovieList
