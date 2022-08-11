import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React, {useState} from 'react';
import '../navBar/Navbar1.css';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';
import constKeys from '../../constantKeys/constantKeys';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function ElevateAppBar(props) {
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleMylist = (event) => {
      history.push('/myListing')
    }
    const handleLogout = () => {
        // props.setLogout({name:"",email:"",password:""})
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
        localStorage.removeItem("loginToken");
        history.push('/');
      };
    const moveToHome =()=>{
      history.push('/')
    } 
    const handleProperty =()=>{
        localStorage.removeItem("editId");
    } 
       const name= localStorage.getItem("userName");
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
          
            <div className="header-maindiv1">
                    <div className="header-childdiv">
                    <img onClick={moveToHome} src="../images/houseLogo.png"></img><span id="id">HOUSING</span>
                    </div>
                </div>
                <div className="header-maindiv2">
                    <div className="header-childdiv1">
                     {name ?    <div className="header-subdiv1">
                            <div className="header-subdiv2">
                                
                                {/* <button type="button" className="booking-btn"> <div className='ui-icon'><CollectionsBookmarkIcon/></div><div className="ui-text">{constKeys.navBar.myBooking}</div></button> */}
                                <Link to="/wishlist" className='link'><button type="button" className="booking-btn"> <div className='ui-icon'><CollectionsBookmarkIcon/></div><div className="ui-text">{constKeys.navBar.myBooking}</div></button></Link>
                            </div>
                          
                            <div className="header-subdiv4">
                                <Link to="/postProperty" className='link'><button onClick={handleProperty} type="button" className="property-btn">{constKeys.navBar.postProperty}</button></Link>

                            </div>

                        </div> :""
                        }
                        </div>
                        </div>
                     {!name ?   <div className="header-subdiv5">
                            <div className="header-subdiv6">
                                <Link className="register-link" to="/register">{constKeys.navBar.signUpLabel}</Link>
                            </div>
                            <div className="header-subdiv7">
                                <Link className="login-link" to="/login">{constKeys.navBar.loginLabel}</Link>
                            </div>
                            <div className="header-subdiv8">

                            </div>
                            </div>
                            :
                            <div className="profile-div">
                            <div id="profile-dashboard">
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            <span id='user'>{name}</span>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={moveToHome}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          {constKeys.navBar.homeLabel}
        </MenuItem>
        {/* <MenuItem value="Profile" >
          <Avatar /> {constKeys.navBar.profile}
        </MenuItem> */}
        <MenuItem className='mylist' value="My account" onClick={handleMylist}>
          <Avatar /> {constKeys.navBar.myListing}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {constKeys.navBar.logoutLabel}
        </MenuItem>
        
      </Menu>
                       </div>
                       </div>
                        } 
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

