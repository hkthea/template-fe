import React, { useCallback, useState } from 'react';
import {TextField, Button, Divider, Typography} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {Message} from 'primereact/message';
import { AppVersion } from '../../../constants/appVersion'
import { blue, green } from '@material-ui/core/colors';

export default ()=>{
    const [data, setData]=useState({username:'',password:''});
    const dispatch = useDispatch();
    const handleLogin=useCallback(()=>{
        const {username, password}=data;
        if(username!=='' && password!=='')
        {
            dispatch({type:'sign-in', payload:{username, password}});
        }
    },[data]);
    const { backend_version }=useSelector(state=>state.Apps);

    const {errMsg} = useSelector(state => state.Auth)

    return (
        <div className="p-shadow-4" style={{display:'flex', justifyContent:'center', 
            flexDirection:'column' ,backgroundColor:'rgb(255 255 255 / 92%)', width:400, margin:'auto', borderRadius:10}}>
            <div style={{display:'flex', flexDirection:'column', flexGrow:1, padding:30}}>

                <h2 style={{textAlign:"center", margin:'10px 25px 25px 25px', color:'darkcyan'}}>Please Enter Your Username And Password</h2>
                {
                    errMsg && <Message severity="error" text={errMsg} />
                }
                <Divider style={{marginBottom:20}}/>
                <div style={{display:'flex', flexDirection:'column', flexGrow:1}}>

                    <TextField
                        label="Username"
                        size="small"
                        // fullWidth
                        value={data.username}
                        onChange={(e)=>setData({...data, username:e.target.value})}
                        onKeyPress={(e)=>{
                            if(e.key==='Enter'){
                                handleLogin();        
                            }
                        }}
                        margin="normal"
                        variant="outlined"
                        style={{width:300, marginRight:'auto', marginLeft:'auto'}}
                    />
                    <TextField
                        label="Password"
                        size="small"
                        type="password"
                        value={data.password}
                        onChange={(e)=>setData({...data, password:e.target.value})}
                        onKeyPress={(e)=>{
                            if(e.key==='Enter'){
                                handleLogin();        
                            }
                        }}
                        margin="normal"
                        variant="outlined"
                        style={{width:300, marginRight:'auto', marginLeft:'auto'}}
                    />
                </div>
                <Button color="primary" variant="contained" style={{width:300, marginRight:'auto', marginLeft:'auto', marginTop:15}} onClick={handleLogin}  >Login</Button>
            </div>
            <div style={{display:'flex', flexDirection:'row-reverse', marginRight:10}}>
                <Typography variant="caption" style={{color:green[700], fontWeight:'bold'}} title="Frontend Version">{AppVersion}</Typography>
            </div>
            <div style={{display:'flex', flexDirection:'row-reverse', marginRight:10, marginBottom:10}}>
                <Typography variant="caption" style={{color:blue[700], fontWeight:'bold'}} title="Backend Version">{backend_version}</Typography>
            </div>
        </div>
    )
}