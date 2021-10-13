import { Typography } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyForm from '../../../../component/myFormContainer';
import { APPVersion } from '../../../../constants/config';
import { updateLog } from '../../../../constants/appVersion';

const MasterForm=()=>{
    const dispatch=useDispatch();
    const {backend_version, backend_update_logs}=useSelector(state=>state.Apps);

    useEffect(()=>{
        dispatch({type:'check-version'});
    },[])
    
    const logs=useMemo(()=>{
        if(updateLog.length<5)return updateLog;
        const res=[];
        for (let iii = 0; iii < 5; iii++) {
            const log = updateLog[iii];
            res.push(log);
        }
        return res;        
    },[updateLog]);
    
    return (
        <React.Fragment>
            <MyForm title={"About This Software"} boxPadding={3}>                
                
                <div style={{display:'flex', flexDirection:'column', padding:15}}>
                    <div style={{border:"1px solid black", padding:15}}>
                        <Typography variant="body1" style={{fontWeight:'bold'}}>Current Version</Typography>
                        <Typography variant="body2">Backend  : {backend_version} </Typography>
                        <Typography variant="body2">Frontend : {APPVersion} </Typography>
                    </div>
                    <div style={{display:'flex', flexDirection:'row', padding:25, justifyContent:'space-around'}}>
                        <div style={{display:'flex', flexDirection:'column', width:'45%'}}>
                            <Typography variant="subtitle1" style={{marginBottom:15}}>Frontend Update History</Typography>
                            {
                                logs?.map((log, idx)=>(
                                    <React.Fragment key={idx}>
                                        <Typography variant="subtitle2" style={{fontWeight:'bold'}}> {log.version} </Typography>
                                        <ul>
                                        {
                                            log.update.map((upd, index)=>(
                                                <li key={`${idx}__${index}`}>{upd}</li>
                                            ))
                                        }
                                        </ul>
                                    </React.Fragment>
                                ))
                            }
                            
                        </div>
                        <div style={{display:'flex', flexDirection:'column', width:'45%'}}>
                            <Typography variant="subtitle1" style={{marginBottom:15}}>Backend Update History</Typography>                            
                            {
                                backend_update_logs?.map((log, idx)=>(
                                    <React.Fragment key={idx}>
                                        <Typography variant="subtitle2" style={{fontWeight:'bold'}}> {log.version} </Typography>
                                        <ul>
                                        {
                                            log.update.map((upd, index)=>(
                                                <li key={`${idx}__${index}`}>{upd}</li>
                                            ))
                                        }
                                        </ul>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </MyForm>            
        </React.Fragment>

    )
}

export default MasterForm;