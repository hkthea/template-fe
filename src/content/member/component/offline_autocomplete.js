import React, {useMemo, useState} from 'react';
import {Autocomplete} from '@material-ui/lab';
import {TextField} from '@material-ui/core';

export default ({ options, maxView, getOptionLabel, ...rest })=>{
    const [qryTxt, setQryTxt]=useState('');
    const {data, inputprops, label, required, ...restOptions}=options;

    const filteredData=useMemo(()=>{
        const result=[];
        const max=maxView || 10;
        const dt=data||[];
        for (let iii = 0; iii < dt.length; iii++) {
            if(result.length>max)break;
            const d = dt[iii];
            const txt=getOptionLabel(d);
            if(`${txt.toLowerCase()}`.indexOf(qryTxt.toLowerCase())<0) continue;
            result.push(d);
        }
        return result;
    },[qryTxt, data]);
    
    return (
        <Autocomplete
            {...rest}
            options={filteredData}
            getOptionLabel={getOptionLabel}
            onInputChange={(e, txt)=>{                
                setQryTxt(txt);
            }}
            renderInput={(params) => <TextField 
                    {...restOptions}
                    margin="normal" 
                    {...params} 
                    {...inputprops}
                    label={label} 
                    required={required}
                />
            }  
        />
    )

}