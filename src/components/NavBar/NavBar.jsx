import React, {useState} from 'react';
import { AppBar, Drawer, Button, IconButton, Toolbar, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useTheme } from '@mui/material/styles';
import Sidebar from '../Sidebar/Sidebar';

function NavBar() {

  const [mobileOpen, setmobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)'); // To check if deivce is mobile
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setmobileOpen((previousMobileOpen)=> !previousMobileOpen)}
              className={classes.menuButton}
            >
              <Menu>

              </Menu>
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => { }}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'Search'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => { }}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button color="inherit"
                component={Link}
                to={'/profile/:id'}
                className={classes.linkButton}
                onClick={() => { }}>
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </div>
          {isMobile && 'Search'}
        </Toolbar>
        <div>
          <nav className= {classes.drawer}>
              {isMobile? (
                <Drawer
                variant ="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={() => setmobileOpen((previousMobileOpen)=> !previousMobileOpen)}
                className= {classes.drawerBackground}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
                >
                <Sidebar setmobileOpen= {setmobileOpen}>

                </Sidebar>

                </Drawer>                
              ): (
                <Drawer classes={{paper: classes.drawerPaper}} variant ="permanent" open>
                  <Sidebar 
                  setmobileOpen= {setmobileOpen}/>
                </Drawer> 
              )} 
          </nav>
        </div>
      </AppBar>
    </>
  )
}

export default NavBar
