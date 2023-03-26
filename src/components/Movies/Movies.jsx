import React, {useState, useEffect} from 'react';
import {Box, CircularProgress, useMediaQuery, Typograpgy} from '@mui/material';
import { useSelector } from 'react-redux';
import {useGetMoviesQuery} from '../../services/TMDB'

const Movies = () => {

  const { data } = useGetMoviesQuery();

  console.log(data)

  return (
    <div>
      <h1>Moviessss</h1>
    </div>
  )
}

export default Movies
