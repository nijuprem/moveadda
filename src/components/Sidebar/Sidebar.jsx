import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import useStyles from './styles';
import { useGetGenreQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" }
];


const blueLogo =
  "https://i.ibb.co/8BjQmDN/logo2.png";
const redLogo =
  "https://i.ibb.co/4P35W2Y/logo1.png";

const Sidebar = ({ setmobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector((state)=> state.currentGenreOrCategory); // To select the slice from store
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenreQuery();
  const dispatch = useDispatch();

  useEffect(()=>{
    setmobileOpen(false);
  }, [genreIdOrCategoryName])

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'dark' ? redLogo : blueLogo}
          alt="MovieAdda Logo"
        >

        </img>
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to='/'>
            <ListItem onClick={() => { dispatch(selectGenreOrCategory(value)) }} button>
              <ListItemIcon>
              <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
            </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent='center'>
            <CircularProgress />
          </Box>
        ) : data.genres.map(({name, id}) => (
        <Link key={name} className={classes.links} to='/'>
          <ListItem onClick={() => {dispatch(selectGenreOrCategory(id)) }} button>

          <ListItemIcon>
              <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
            </ListItemIcon>

            <ListItemText primary={name} />
          </ListItem>
        </Link>
        ))}
      </List>

    </>
  )
}

export default Sidebar
