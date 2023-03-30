import React, {useState} from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating, useMediaQery } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite , FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import useStyles from './styles';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import {useGetRecommendationsQuery} from '../../services/TMDB'
import MovieList from '../MovieList/MovieList'

import { useGetMovieQuery } from '../../services/TMDB'
import genreIcons from '../../assets/genres';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const {data: recommendations, isFetching: isRecommendationsFetching} = useGetRecommendationsQuery({list: '/recommendations', movie_id: id})
  const isMovieFavorited = false;
  const isMovieWatchlisted = false;
  // console.log(recommendations)
  const addToFavorites = ()=>{

}
 
const addToWatchlist = ()=>{

}

  if (isFetching) {
    return (
      <Box display='flex' justifyContent="center" alignItems='center'>
        <CircularProgress size='8rem' />
      </Box>
    )
  }
  if (error) {
    return (
      <Box display='flex' justifyContent="center" alignItems='center'>
        <Link to="/"> Something has gone wrong -Go back</Link>
      </Box>
    )
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />

      </Grid>
      <Grid item container direction='column' lg={7}>
        <Typography variant="h3" align="center" gutterBottom> {data?.title} ({data.release_date.split('-')[0]})</Typography>
        <Typography variant="h5" align="center" gutterBottom> {data?.tagline}</Typography>
        <Grid type="item" className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} precision={0.1}></Rating>
            <Typography variant="subtitle1" style={{ marginLeft: '10px' }} gutterBottom> {(data?.vote_average).toPrecision(2)} /10</Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom> {data?.runtime} mins {data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}` : ''}</Typography>
        </Grid>
        
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link key={genre.name} className={classes.links} to="/" onClick={() => { dispatch(selectGenreOrCategory(genre.id)) }}>
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
            </Link>
          ))}
        </Grid>

        <Typography variant='h5' gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, index) => (
            character.profile_path &&
            (<Grid key={index} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                alt={character.name} />
              <Typography color='textPrimary'>{character.name}</Typography>
              <Typography color='textSecondary'>{character.character.split('/')[0]}</Typography>
            </Grid>)
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant='outlined'>
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon= {<Language/>}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon= {<MovieIcon/>}>IMDB</Button>
                <Button onClick={()=> setOpen(true)} href="#" endIcon= {<Theaters/>}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant='outlined'>
                <Button onClick={addToFavorites} endIcon= {isMovieFavorited ? <FavoriteBorderOutlined/>: <Favorite />}>
                {isMovieFavorited? 'Unfavorite' : 'Favorite'}
                </Button>
                
                <Button onClick={addToWatchlist} endIcon= {isMovieWatchlisted ? <Remove />: <PlusOne />}>
                Watchlist
                </Button>

                  
                <Button endIcon= {<ArrowBack/>} sx={{'borderColor': 'primary.main'}}>
                <Typography component={Link} to='/' color='inherit' variant='subtitle2' style={{'textDecoration': 'none'}}>Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width="100%">
            <Typography variant='h3' gutterBottom align='center'> You Might Also Like </Typography>
            {recommendations?.results?.length ? <MovieList movies={recommendations} numberOfMovies={12}/> :
            <Box> Sorry nothing was found </Box>
            }
      </Box>
      <Modal
      closeAfterTransition
      className={classes.modal}
      open={open}
      onClose={()=> setOpen(false)}
      >
        {data?.videos?.results?.length>0 &&(
          <iframe src={`https://www.youtube.com/embed/${data?.videos.results[0].key}`}
          autoplay
          className={classes.videos}
          frameborder= '0'
          title="Trailer"
          allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  )
}

export default MovieInformation
