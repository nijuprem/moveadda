import React, {useEffect} from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

const Profile = () => {
  const { user } = useSelector((state)=> state.user);
  const favouriteMovies = [];
  const logout = ()=>{
    localStorage.clear();
    window.location.href='/'
  }
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick = {logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favouriteMovies.length
      ? <Typography variant = "h5"> Add Favourites of Watchlist some movies to see them here!</Typography>
      : <Box>
        Favourite Movies
      </Box>
       }
    </Box>
  )
}

export default Profile;
