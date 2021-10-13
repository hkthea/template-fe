import { Box, Paper, TextField, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import filesize from 'filesize';

export default ({ Icon, Color, Value, Label, caption, panelStyle, ValueProps, LabelProps, CaptionProps, valueType })=>{
    const DEFICONPROPS={size:48, color:'white'};
    const DEFLABELPROPS={ justifyContent:'center', alignItems:'center', display:'flex', color:'white'};
    const DEFCAPTIONPROPS={ justifyContent:'center', alignItems:'center', display:'flex', color:'white'};
    const DEFVALUEPROPS={flexGrow:1, justifyContent:'flex-end', alignItems:'center', display:'flex', marginRight:15, color:'white'};
    
    const value=useMemo(()=>{
        if(!valueType || valueType==='none')return Value
        if(valueType==='bytes')
        {
            return filesize(Value);
        }
    },[Value, valueType]);
    
    return (
        <Paper style={{backgroundColor:Color, width:240, height:120, margin:10, ...panelStyle}}>
            <div style={{display:'flex', flexDirection:'column', width:'100%', height:'100%', paddingRight:10, paddingLeft:10}}>
                <div style={{...DEFLABELPROPS, ...LabelProps}}>
                    <Typography variant="body1">{Label}</Typography>
                </div>
                <div style={{flexGrow:1, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{width:50, justifyContent:'center', flexDirection:'column', display:'flex'}}>
                        {Icon && (typeof Icon==='function') && Icon(DEFICONPROPS)}
                    </div>
                    <div style={{...DEFVALUEPROPS, ...ValueProps}}>
                        <Typography variant="h4">{value}</Typography>
                    </div>
                </div>
                <div style={{...DEFCAPTIONPROPS, ...CaptionProps}}>
                    <Typography variant="caption">{caption}</Typography>
                </div>
            </div>
            <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
            </div>        
        </Paper>
    ) 
}