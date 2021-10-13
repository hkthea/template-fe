import React, { useEffect, useCallback, useMemo, useState } from 'react';
import {
  CssBaseline,
  Drawer,
  Hidden,
  Menu, 
  MenuItem,
  Container,
} from '@material-ui/core';

import {
  MdMail as MailIcon,
  MdAccountCircle as AccountCircle
} from 'react-icons/md';
import {generateMemberMenu, MEMBER_MENU, MENU_INDEXED} from '../menu'
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../../component/header';
import Sidebar from '../../../component/sidebar';

import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles';
// import MemberRouter from './routes';
// import MyBreadcrumbs from '../../../component/breadcumbs';
import {useLocation, useHistory} from 'react-router-dom';
import MemberRouting from './routes'
import { useFetch } from '../../../component/useFetch';

const drawerWidth = 270;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,      
    },
    content: {
      flexGrow: 1,
    },
  }),
);

const MenuAccount=({anchorEl, handleClose})=>{
  const dispatch=useDispatch();
  const history=useHistory();
  return (
    <Menu
      anchorEl={anchorEl}
      id='menu-account-circle'
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      elevation={0}
    >
      <MenuItem onClick={()=>{
        // navigate member profile.
        history.push('/dashboard/profile');

      }}>Profile</MenuItem>
      <MenuItem onClick={()=>{
        dispatch({type:'sign-out'});
      }}>Logout</MenuItem>
    </Menu>
  )
}


export default function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  // const [menus, setMenus]=useState(MEMBER_MENU);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [accountMenuAnchEl, setAccountMenuAnchEl]=React.useState(null);
  const {user, token}=useSelector(state=>state.Auth);
  const location=useLocation();
  const u=user;
  const dispatch=useDispatch();
  
  const menus=useMemo(()=>{
    return MEMBER_MENU;
  },[MEMBER_MENU]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  return (
    <div className={classes.root}>
      <CssBaseline />
        <Header 
          title={'Avianca Airlines'}
          appBarClassName={classes.appBar}
          handleDrawerToggle={handleDrawerToggle}
          menuItems={[            
            {
              badge:0,
              label:'Account',
              color:'primary',
              ariaControls:'menu-account-circle',
              Icon:<AccountCircle/>,
              handle:(event)=>{                
                setAccountMenuAnchEl(event.currentTarget)
              }
            }
          ]}
        />
        <MenuAccount
            anchorEl={accountMenuAnchEl}
            handleClose={()=>{
              setAccountMenuAnchEl(null);
            }}
        />     
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,              
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >            
            <Sidebar 
              user={u} 
              level={u?.level} 
              listMenu={menus} 
              listMenuIndex={MENU_INDEXED} 
            />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Sidebar 
              user={u} 
              level={u?.level} 
              listMenu={MEMBER_MENU} 
              listMenuIndex={MENU_INDEXED} 
            />            
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div style={{width:'100%', minHeight:720, maxHeight:1080, display:'flex', alignItems:'flex-start', flexDirection:'column'}}>
            <div className={classes.toolbar} />
            <MemberRouting level={user.level} style={{width:'100%'}} />
        </div>        
      </main>
    </div>
  );
}