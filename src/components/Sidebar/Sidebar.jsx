import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import useStyles from './styles';

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" }
];

const demoCategories = [
  { label: "Comedy", value: "comedy" },
  { label: "Action", value: "action" },
  { label: "Horror", value: "horror" },
  { label: "Animation", value: "animation" },
];


const redLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsOr1vzsYwCx2KkpBZHhRT10mXzCiMgeAdmQMkuF0sw&usqp=CAU&ec=48665698";
const blueLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsOr1vzsYwCx2KkpBZHhRT10mXzCiMgeAdmQMkuF0sw&usqp=CAU&ec=48665698";

const Sidebar = ({ setmobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="MovieAdda Logo"
        >

        </img>
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to='/'>
          <ListItem onClick={()=>{}} button>
            {/* <ListItemIcon>
              <img src={redLogo} className={classes.genreImages} height={30} />
            </ListItemIcon> */}
            <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to='/'>
          <ListItem onClick={()=>{}} button>
            {/* <ListItemIcon>
              <img src={redLogo} className={classes.genreImages} height={30} />
            </ListItemIcon> */}
            <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      
    </>
  )
}

export default Sidebar
