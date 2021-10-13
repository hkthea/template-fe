import React, {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles';
import { 
    Divider,
    // ListSubheader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Avatar,
    IconButton
} from '@material-ui/core';
import {
    FaChevronRight as ExpandMore,
    FaChevronDown as ExpandLess
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
// import { MEMBER_MENU, MENU_INDEXED } from '../content/member/menu';
import {v4 as uidv4 } from 'uuid';
// import CustomScrollbars from 'react-custom-scrollbars';
import './scrollbar.css';
import numeral from 'numeral';
import { MdRefresh } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logoDashboardCfg, logoPaddingCfg, headerColorCfg } from '../constants/config';

// const menuIndex=MENU_INDEXED;

const useStyles = makeStyles((theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
        listIcon:{
            color:'#effffe',
            minWidth:32
        }
    })
);

// const 

const ListMenu=({menu, indexMenu, menuHandle, depth, parentIndex, menuIndex, level, sidebar_notif})=>{
    const theme=useTheme();    
    const classes=useStyles();
    const notif_style_root={display:'flex', flexDirection:'row', justifyContent:'space-between'};
    const notif=useMemo(()=>{
        if(!menu?.notif_id)return false;
        const [found]=sidebar_notif.filter(ntf=>menu.notif_id===ntf.notif_id);        
        if(!found)return false;
        const {display, value}=found;
        return display==='number'?numeral(value).format('0,000'):value;
    },[sidebar_notif]);
    // console.log({notif, sidebar_notif});
    return (
        <div>
            <ListItem
                component={NavLink}
                to={menu.url}
                button 
                selected={menu.selected}
                onClick={()=>{
                    menuHandle && menuHandle(menu, indexMenu, parentIndex);
                }}
                style={{
                    paddingLeft:theme.spacing((depth + 1)*2)
                }}
            >
                {
                    menu.icon && (
                        <ListItemIcon className={classes.listIcon}>{menu.icon}</ListItemIcon>
                    )
                }            
                <ListItemText primary={
                    <Typography variant="body2" style={(menu.childs.length===0 && !menu.active)?{...notif_style_root ,textDecoration:'line-through', color:'red'}:notif_style_root}>
                        {menu.name} {
                            notif && (
                                <span style={{padding:'0px 5px', backgroundColor:headerColorCfg, borderRadius:'10px', marginRight:15}}>
                                    {notif}
                                </span>
                            )
                        }
                    </Typography>
                } />
                {
                    menu.childs.length>0 && (
                        menu.isOpened? <ExpandLess/>:<ExpandMore/>
                    )
                }            
            </ListItem>
            {
                menu.childs.length>0 && (
                    <Collapse in={menu.isOpened} timeout="auto" unmountOnExit>
                        <ExtractChildMenu
                            depth={depth+1}
                            menu={menu.childs}
                            parentIndex={indexMenu}
                            menuHandle={menuHandle}
                            menuIndex={menuIndex}
                            level={level}
                            parent={menu}
                        />
                    </Collapse>
                )
            }
        </div>
    )
}

const ExtractChildMenu=({menu, parentIndex, menuHandle, depth, parent, level, menuIndex, scrollbar})=>{
    const {sidebar_notif}=useSelector(state=>state.Apps);
    
    return (
        <List>
            {
                menu && menu.map((m, index)=>{          
                    if(m.id===''){
                        const id=uidv4();
                        m.id=id;        
                        menuIndex[`${id}`]=m;                
                        m.parent=parent;
                    }  
                    if(m.routingOnly){
                        return false;
                    }
                    if(level && ((m.level & level)>0))
                    {
                        return(
                            <ListMenu 
                                key={m.id} 
                                menu={m} 
                                indexMenu={index} 
                                menuHandle={menuHandle} 
                                depth={depth} 
                                level={level}
                                sidebar_notif={sidebar_notif}
                                parentIndex={parentIndex} 
                                menuIndex={menuIndex}
                            /> )
                    }
                    else if(!level)
                    {
                        return(
                            <ListMenu 
                                key={m.id} 
                                menu={m} 
                                indexMenu={index} 
                                sidebar_notif={sidebar_notif}
                                menuHandle={menuHandle} 
                                depth={depth} 
                                menuIndex={menuIndex}
                                level={level}
                                parentIndex={parentIndex} 
                            /> )
                    }
                    else
                    {
                        return false;
                    }
                }).filter(list=>list)
            }
        </List>
    )
}

const Sidebar=({user, level, listMenu, listMenuIndex, deposit, onRefreshDeposit})=>{
    const classes=useStyles();
    const scrollbar=useRef();
    const [menu, setMenu]=useState(listMenu);
    const [scrollValue, setScrollValue]=useState(0);
    const logo=logoDashboardCfg;
    const dispatch=useDispatch();

    const selectParent=(parent)=>{
        if(parent)
        {
            parent.selected=true;
            parent.isOpened=true;
            return selectParent(parent.parent);
        }
        return false;
    }

    const menuHandle=useCallback((selectedMenu, index, parentIndex, accu)=>{
        // reset dulu isOpened false semua.
        // console.time('menu');
        for (const key in listMenuIndex) {
            if (listMenuIndex.hasOwnProperty(key)) {
                const mn = listMenuIndex[key];
                mn.selected=false;
                if(selectedMenu.id!==mn.id){
                    mn.isOpened=false;
                }
            }
        }
        selectedMenu.selected=true;        
        selectParent(selectedMenu.parent);
        if(selectedMenu.childs.length>0){
            selectedMenu.isOpened = !selectedMenu.isOpened;
        }        
        setMenu([...menu]);        
        // console.timeEnd('menu');
    }, [menu, listMenuIndex]);

    useEffect(()=>{
        dispatch({type:'load-inbox-counter'});
        const interval=setInterval(()=>{
            dispatch({type:'load-inbox-counter'});
        },60000);
        return ()=>{
            clearInterval(interval);
        }
    },[])
    
    return (
        <div className="scrollbar scrollbar-lady-lips bordered-primary square thin">
            <div className={classes.toolbar} style={{display:"flex", justifyContent:"center", alignItems:"center", maxHeight:64, overflow:'hidden'}}>
               <img src={logo} style={{width:'100%', padding:logoPaddingCfg }}/>
            </div>
            <Divider/>
            <div style={{padding:"10px 15px", display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                <Avatar src={'/assets/imgs/captain.png'}>{(user.nama || user.displayName || user.name)?.substring(0,1).toUpperCase()}</Avatar>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography style={{marginLeft:"5px", textTransform:'uppercase'}}><b>{user.username}</b></Typography>
                    <Typography style={{marginLeft:"5px", fontWeight:'lighter', fontSize:10, textTransform:'uppercase'}}>{`${user.username}@${user?.domain}`}</Typography>
                    {
                        user?.agent_id && (
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <div>
                                    <Typography style={{marginLeft:"10px", fontWeight:'lighter', fontSize:10, textAlign:'left'}}>
                                        {user.agent_id?.currency?.code}
                                    </Typography>
                                </div>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                                    <Typography style={{marginLeft:"10px", fontWeight:'lighter', fontSize:14, textAlign:'right'}}>
                                        {numeral(deposit||0).format(deposit>999999?'0,000':'0,000.00')}
                                    </Typography>
                                    <IconButton size="small" onClick={onRefreshDeposit} >
                                        <MdRefresh style={{color:'#fff'}} />
                                    </IconButton>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Divider/>
            <ExtractChildMenu 
                menu={menu}
                menuHandle={menuHandle}
                menuIndex={listMenuIndex}
                depth={0}
                parentIndex={-1}
                level={level}
            />            
        </div>
    )
}

export default Sidebar;