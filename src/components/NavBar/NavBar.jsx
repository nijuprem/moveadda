import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Drawer, Button, IconButton, Toolbar, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import {setUser, userSelector} from '../../features/auth'
import Sidebar from '../Sidebar/Sidebar';
import Search from '../Search/Search';
import { fetchToken, createSessionId, moviesApi } from '../../utils/index';
import useStyles from './styles';


function NavBar() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setmobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)'); // To check if deivce is mobile
  const theme = useTheme();
  const dispatch = useDispatch();
  // console.log(user)

  const colorMode = useContext(ColorModeContext)

  const token = localStorage.getItem('request_token');
  const sessionIdLocalStorage = localStorage.getItem('session_id');

  useEffect(() =>{
    const loginUser =async ()=>{
      if(token){
        if(sessionIdLocalStorage){
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionIdLocalStorage}`)
          dispatch(setUser(userData));
        }else{
          const sessionId = await createSessionId()
          const {data: userData} = await moviesApi.get(`/account?session_id=${sessionId}`)
          dispatch(setUser(userData));
        }
      }
    }
    loginUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setmobileOpen((previousMobileOpen) => !previousMobileOpen)}
              className={classes.menuButton}
            >
              <Menu>

              </Menu>
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={ fetchToken }>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => { }}>
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setmobileOpen((previousMobileOpen) => !previousMobileOpen)}
              className={classes.drawerBackground}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setmobileOpen={setmobileOpen}>

              </Sidebar>

            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar
                setmobileOpen={setmobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
      {/* </AppBar> */}
    </>
  )
}

export default NavBar;