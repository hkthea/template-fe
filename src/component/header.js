import React, { useMemo } from 'react';
import {
    Toolbar, 
    AppBar, 
    Typography, 
    Badge, 
    Menu, 
    MenuItem,
    IconButton
} from '@material-ui/core';
import { MdMoreVert as MoreVert, MdMenu as MenuIcon } from 'react-icons/md';
import { fade, makeStyles } from '@material-ui/core/styles';
import {green, grey, lightBlue, lightGreen, orange, red, yellow} from '@material-ui/core/colors'
import { useSelector } from 'react-redux';
import { headerColorCfg, titleCfg } from '../constants/config';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
}));
  
const MobileMenu=({mobileMoreAnchorEl, isMobileMenuOpen, handleMobileMenuClose, mobileMenuId, MenuItems })=>(
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        {
            MenuItems && MenuItems.map((item, index)=>{
                const { Icon, badge, color, label, ariaLabel, handle, ariaControls }=item;
                return (
                    <MenuItem key={index} onClick={handle}>
                        <IconButton aria-label={ariaLabel || ''} aria-controls={ariaControls} color="inherit" >
                          {
                            (
                              badge!==false && (
                                <Badge badgeContent={ badge || 0 } color={color || 'primary'}>
                                    {Icon}
                                </Badge>
                              )
                            ) || (
                              {Icon}                            
                            )
                          }                          
                        </IconButton>
                        <p>{label}</p>
                    </MenuItem>
                )
            })
        }
    </Menu>
)

const DesktopMenu=({MenuItems})=>(
  <div>
    {
      MenuItems && MenuItems.map((item, index)=>{
        const { Icon, badge, color, ariaLabel, ariaControls, handle }=item;
        return (
          <IconButton key={index} aria-label={ariaLabel || ''} aria-controls={ariaControls} color="inherit" onClick={handle}>
            {
              (
                badge!==false && (
                  <Badge badgeContent={ badge || 0 } color={color || 'primary'}>
                      {Icon}
                  </Badge>
                ) 
              ) || (
                <Icon/>
              )
            }
          </IconButton>
        )
      })
    }
  </div>
)
  
const Header=({title, notification, messages, menuItems, appBarClassName, handleDrawerToggle})=>
{
    const classes=useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
    
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    const mobileMenuId='mobile-menu-id';
    const color=headerColorCfg;
    return (
        <div >
            <AppBar position="fixed" className={appBarClassName} style={{backgroundColor:color}}>
              <Toolbar className={classes.grow}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  onClick={handleDrawerToggle}
                  aria-label="open drawer"
                >
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                  {titleCfg}
                </Typography>
                <div className={classes.grow}/>
                <div className={classes.sectionDesktop}>
                  <DesktopMenu 
                    MenuItems={menuItems || []}
                  />
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreVert />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <MobileMenu
              mobileMoreAnchorEl={mobileMoreAnchorEl}
              isMobileMenuOpen={isMobileMenuOpen} 
              handleMobileMenuClose={handleMobileMenuClose}
              mobileMenuId={mobileMenuId} 
              MenuItems={menuItems || []}
            />
        </div>
    )
}

export default Header;