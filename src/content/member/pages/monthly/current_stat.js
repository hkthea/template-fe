import { Typography } from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';
import React, { useMemo } from 'react';
import { RiInboxArchiveFill, RiMailSendLine } from 'react-icons/ri';
import Panel from './panel';
import { makeMonthlyReportStateAdminPanelData, makeMonthlyReportStatePanelData } from './report';

export default ({data, loading})=>{

    const panelData=useMemo(()=>{
        if(loading)return [];
        if(!data)return [];
        const {all, receive, send}=data;
        if(all)return makeMonthlyReportStateAdminPanelData(send, receive);
        return makeMonthlyReportStatePanelData(send, receive);
    }, [data]);

    return (
        <div style={{display:'flex', flexDirection:'column'}}>            
            {
                panelData.length>0 && (data?.all && <Typography>Data by Server Name</Typography> || <Typography>Data by Telex Address</Typography> )
            }
            {
                panelData.length>0 && panelData.map((aData, idx)=>(
                    <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}} key={idx}>                        
                        <Panel 
                            Color={green[400]} 
                            Icon={(props)=><RiMailSendLine {...props} />} 
                            caption="Total Sent Message" 
                            Label={aData.telexAddr} 
                            Value={aData.send.message_count}                             
                        />
                        <Panel 
                            Color={green[800]} 
                            Icon={(props)=><RiMailSendLine {...props} />} 
                            caption="Total Sent Char" 
                            Label={aData.telexAddr} 
                            Value={aData.send.char_count}                             
                            valueType="bytes"
                        />                        
                        <Panel 
                            Color={blue[400]} 
                            Icon={(props)=><RiInboxArchiveFill {...props} />} 
                            caption="Total Receive Message" 
                            Label={aData.telexAddr} 
                            Value={aData.receive.message_count}                             
                        />
                        <Panel 
                            Color={blue[800]} 
                            Icon={(props)=><RiInboxArchiveFill {...props} />} 
                            caption="Total Receive Char" 
                            Label={aData.telexAddr} 
                            valueType="bytes"
                            Value={aData.receive.char_count}                             
                        />
                    </div>                    
                )) || <Typography variant={"h4"} align="center">Data Not Found</Typography>
            }            
        </div>
    )
}