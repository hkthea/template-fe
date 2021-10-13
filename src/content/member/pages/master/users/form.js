import React, {useMemo, useState, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {TextField, Button, Paper, Typography, Divider, Box, Select, MenuItem, FormControl, InputLabel, Container, FormControlLabel, Switch} from '@material-ui/core';

import { useHistory, useParams, useLocation } from 'react-router-dom';
// import Autocomplete from '../../../component/autocomplete';
import {useStyles} from '../../../styles/Styles';
import {getRoles} from './roles'
import MyForm from '../../../../../component/myFormContainer';
import moment from 'moment';

const MasterForm=()=>{
    const classes=useStyles();
    const location=useLocation();
    const {state}=location;
    const history=useHistory();
    const {token, user}=useSelector(state=>state.Auth);
    const isCreate=useMemo(()=>{
        if(state?.isCreate===undefined)
        {
            return true;
        }
        return state.isCreate;
    },[state])
    const roles=useMemo(()=>getRoles(user.level),[user.level]) 
    const stateLoc=location?.state?.data || { name:'', username:'', email:'', level:1, routing:''};
    const dispatch=useDispatch();
    const [data, setData]=useState({...stateLoc, password:''});
    return (
        <MyForm title={isCreate?'Create User':'Edit User'} boxPadding={3}>
            <form noValidate autoComplete="off"> 
                <div className={classes.formConMaster}>                    
                    <TextField
                        fullWidth
                        margin="normal"
                        required
                        defaultValue={data.username}
                        label="Username"
                        onChange={(e)=>setData({...data, username:e.target.value.toUpperCase()})}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        required
                        defaultValue={data.routing}
                        label="Routing"
                        helperText="Separate with space"
                        onChange={(e)=>setData({...data, routing:e.target.value.toUpperCase()})}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        defaultValue={data.name}
                        required
                        label="Name"
                        onChange={(e)=>setData({...data, name:e.target.value})}
                    />                    
                    <TextField
                        fullWidth
                        margin="normal"
                        required={isCreate}
                        label="Password"
                        type="password"
                        onChange={(e)=>setData({...data, password:e.target.value})}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={((data.level & 2) > 0)}
                                onChange={(e)=>{
                                    const lv=e.target.checked?3:1;
                                    setData({...data, level:lv});
                                }}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        style={{marginTop:10, marginBottom:10}}
                        label="Secondary Email (Used for send and receive mail with attachments)"
                    />
                </div>
                <div className={classes.btnContainerForm}>
                    <Button variant="contained"
                        style={{backgroundColor:'red', color:'white', marginRight:15}}
                        onClick={()=>{
                            history.push('/dashboard/master/user');
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" 
                        color="primary"
                        onClick={()=>{
                            const routing=data.routing.split(' ').filter(m=>m);   
                            const d={ ...data, isCreate, routing};              
                            if(isCreate && (data.password===''))return;           
                            dispatch({type:'save', payload:{data:d, history, isCreate, callbackPath:'/dashboard/master/user', 
                                url:'api/v1/users', pure:true, id:data?._id}});
                        }} 
                    >
                        Save
                    </Button>
                </div>
            </form>
        </MyForm>
                
    )
}

export default MasterForm;