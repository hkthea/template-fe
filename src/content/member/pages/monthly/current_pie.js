import { Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import PieChart from './pie_chart';

export default ({data, loading})=>{

    const panelData=useMemo(()=>{
        if(loading)return [];
        if(!data)return [];
        const {panel_data}=data;
        return panel_data || {send:[], receive:[], telexAddr:''};
    }, [data, loading]);

    const chartsData=useMemo(()=>{
        if(panelData.length===0)return [];

        return panelData.map(({telexAddr, send, receive}, idx)=>({telexAddr, message:[
            {name:'Received', value:receive.message_count},
            {name:'Sent', value:send.message_count},
        ], chars:[
            {name:'Received', value:receive.char_count},
            {name:'Sent', value:send.char_count},
        ]}));
    },[panelData])

    return (
        <div style={{display:'flex', flexDirection:'column'}}>            
            {
                panelData.length>0 && ((data?.all && <Typography>Data by Server Name</Typography> )|| <Typography>Data by Telex Address</Typography> )
            }
            {
                chartsData.map((aData, idx)=>(<PieChart key={idx} MessageCount={aData.message} CharCount={aData.chars} TelexAddress={aData.telexAddr} />))
            }   
        </div>
    )
}