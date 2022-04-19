import React, {useMemo, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Button} from '@material-ui/core';

import { useHistory,  useLocation } from 'react-router-dom';
// import Autocomplete from '../../../component/autocomplete';
import {useStyles} from '../styles/style2';
import MyForm from '../../../component/myFormContainer';

const MasterForm=({FormField, title, defState, indexPage, callbackPath, successCallback,
    apiUrl, onBeforeSave, withButton, curdForm, getStateData})=>{
    const classes=useStyles();
    const location=useLocation();
    const {state}=location;
    const history=useHistory();
    const isCreate=useMemo(()=>{
        if(state?.isCreate===undefined)
        {
            return true;
        }
        return state.isCreate;
    },[state])
    const stateLoc=(location?.state?.data && 
        ((!!getStateData && typeof getStateData==='function' && getStateData(location.state.data)) || location.state.data)) 
            || defState;
    const dispatch=useDispatch();
    const [data, setData]=useState({...stateLoc});

    const RenderButtons=()=>(
        <div style={{display:'flex', flexDirection:'row', justifyContent:'end', marginBlock:24}}>
            <Button variant="contained"
                style={{backgroundColor:'red', color:'white', marginRight:15}}
                onClick={()=>{
                    history.push(indexPage);
                }}
            >
                Cancel
            </Button>
            <Button variant="contained" 
                color="primary"
                onClick={()=>{
                    const d={ ...data, isCreate};              
                    const aData=typeof onBeforeSave==='function'?onBeforeSave(d):d;
                    if(!aData)return false;
                    dispatch({type:'save', payload:{data:aData, history, isCreate, 
                        callbackPath, successCallback,
                        url:apiUrl, pure:true, id:data?._id}});
                }} 
            >
                Save
            </Button>
        </div>
    )

    return (
        <MyForm title={`${curdForm!==false?(isCreate?'Create':'Edit'):''} ${title}`} boxPadding={3}>
            <form noValidate autoComplete="off"> 
                <div className={classes.formConMaster}>                    
                    {<FormField data={data} setData={setData} />}
                </div>
                {
                    withButton!==false && <RenderButtons />
                }
            </form>
        </MyForm>
                
    )
}

export default MasterForm;