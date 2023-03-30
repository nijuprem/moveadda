import React from 'react';
import { Grid } from '@mui/material';

import useStlyes from './styles'
import Movie from '../Movie/Movie';

const MovieList = ({movies, numberOfMovies}) => {

    const classes= useStlyes();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(0, numberOfMovies).map((movie, i)=>(
        <Movie key={i} i={i} movie={movie} />
      ))}
    </Grid>
  )
}

export default MovieList
