import { Box, Button, Modal, Paper, TextField, Typography } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyPage from '../../../../component/myFormContainer';
import {useStyles} from '../../styles/style2';
import { indigo, orange } from '@material-ui/core/colors'
import { FaKey, FaRegSave } from 'react-icons/fa';


export default ()=>{
    const classes=useStyles();
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.Auth);
    const wOffice=useMemo(()=>{
        if(!user.agent_id)return '';
        const {work_office}=user.agent_id;
        const w=work_office.map(({code})=>code);
        return w.join(', ');
    },[user.agent_id]);
    const [open, setOpen]=useState(false);
    const [passwModel, setPassModel]=useState({current:'', newPass:'', conf:''});
    const renderModal=()=>(
        <Modal
            open={open}
            onClose={()=>setOpen(false)}            
        >
            <div className={classes.modalContainer}>                
                <div className={classes.panelBodyCol}>
                    <TextField 
                        value={passwModel.current}
                        label={'Current Password'}
                        margin="normal"
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        onChange={(e)=>setPassModel({...passwModel, current:e.target.value })}
                    />
                    <TextField 
                        value={passwModel.newPass}
                        label={'New Password'}
                        margin="normal"
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        onChange={(e)=>setPassModel({...passwModel, newPass:e.target.value })}
                    />
                    <TextField 
                        value={passwModel.conf}
                        label={'Confirm New Password'}
                        margin="normal"
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        onChange={(e)=>setPassModel({...passwModel, conf:e.target.value })}
                    />
                </div>
                <Button variant="contained" color="primary" size="small" onClick={()=>{
                    const {conf, current, newPass}=passwModel;
                    if(conf!==newPass){
                        dispatch({type:'show-notifications', payload:{code:'error', message:'New Password And Confirmation Different!', title:"Error"}});
                        return;
                    }
                    const data={password:newPass, current};
                    dispatch({type:'save', payload:{url:'auth/changePassword', callbackPath:'#', successCallback:()=>{
                        setOpen(false);
                        dispatch({type:'show-notifications', payload:{code:'success', message:'Change Password Success', title:'Success'}})
                    }, data}})
                }}>Save</Button>                
            </div>
        </Modal>
    ) 

    const [model,setModel]=useState({name:user.name, email:user.email, phone:user.phone});
    return(
        <div style={{display:'flex', justifyContent:'space-around', width:'100%', flexDirection:'row'}}>
            {
                ((user.level & 0x8) > 0) && (!!user.agent_id) && (
                    <div style={{width:'52%'}}>
                        <MyPage title={"Agent Profile"} boxPadding={4}>
                            <div className={classes.panelBodyRow} style={{padding:5}}>
                                <TextField
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    label="Office Code"
                                    className={classes.inpSm}
                                    value={user.agent_id.officeCode}
                                />
                                <TextField
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    label="Agent Code"
                                    className={classes.inpSm}
                                    value={user.agent_id.code}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="Iata Code"
                                    className={classes.inpSm}
                                    value={user.agent_id.iataNumber}
                                />
                            </div>
                            <div className={classes.panelBodyRow} style={{padding:5}}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="Agent Name"
                                    className={classes.inpLg}
                                    value={user.agent_id.name}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="Agent Type"
                                    className={classes.inpSm}
                                    value={user.agent_id.agentType}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="Address"
                                    className={classes.inpLg}
                                    value={user.agent_id.address}
                                />                                
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="City"
                                    className={classes.inpSm}
                                    value={user.agent_id.city}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="Phone"
                                    className={classes.inpSm}
                                    value={user.agent_id.phone}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="Email"
                                    className={classes.inpMd}
                                    value={user.agent_id.email}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="Work Office"
                                    className={classes.inpMd}
                                    value={wOffice}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="User Limit"
                                    className={classes.inpSm}
                                    value={user.agent_id.usersLimit}
                                />
                            </div> 
                            <div className={classes.panelContainer} style={{padding:15}}> 
                                <Typography variant="body1">
                                    For agent data changes, please contact head office
                                </Typography>
                            </div>
                        </MyPage>
                    </div>
                )
            }
            <div style={{width:'45%'}}>
                <MyPage title={'User Profile '+user.username} boxPadding={4}>
                    <div className={classes.panelBodyRow} style={{padding:5}}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Username"
                            className={classes.inpSm}
                            value={user.username}
                        />
                        <TextField
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Name"
                            className={classes.inpMd}
                            value={model.name}
                            onChange={(e)=>setModel({...model, name:e.target.value})}
                        />
                        <TextField
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Email"
                            className={classes.inpLg}
                            value={user.username+'@'+user.domain}
                        />
                        <TextField
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Routing"
                            className={classes.inpLg}
                            disabled
                            value={user.routing?.join(' ')}                            
                        />
                    </div>
                    <div className={classes.panelContainer} style={{padding:15}}> 
                        <Typography variant="body1">
                            After change user profile, please relogin for profile changes.
                        </Typography>
                    </div>
                    <div className={classes.panelBodyRow} style={{justifyContent:'flex-end'}}>
                        <Button variant="contained" style={{marginRight:10, color:'white', backgroundColor:indigo[700]}} 
                            startIcon={<FaRegSave/>} onClick={()=>{
                                const payload={ data:model, url:'auth/profile', callbackPath:'#', successCallback:()=>{
                                    dispatch({type:'show-notifications', payload:{code:'success', 
                                        message:'Change Profile Success', title:'Success'}})
                                }}
                                dispatch({type:'save', payload});
                            }}>
                            Save
                        </Button>
                        <Button variant="contained" style={{backgroundColor:orange[800], color:'white' }} 
                            startIcon={<FaKey/>} onClick={()=>{
                                setPassModel({current:'', newPass:'', conf:''});
                                setOpen(true)
                            }} >
                            Change Password
                        </Button>
                    </div>
                    
                </MyPage>
            </div>
            {
                renderModal()
            }
        </div>
    )
}