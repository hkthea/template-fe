import React, {useMemo, useState} from 'react';
import {Autocomplete} from '@material-ui/lab';
import {TextField} from '@material-ui/core';
import {useFetch} from './useFetch';

function processData(data, onCreateOptions){    
    return data && data.map(d=>{
        return (onCreateOptions && onCreateOptions(d)) || d;
    })
}

export default ({url, token, onTokenExpired, onServerError, AutocompleteOptions, onCreateOptions })=>{
    const [qryTxt, setQryTxt]=useState('');
    const {asyncOptions, timeoutValue, useFilterOptions, ...restOptions}=AutocompleteOptions;
    let timeout=false;
    const uri=useMemo(()=>{
        if(!!asyncOptions){
            return url+qryTxt;
        }
        return url;
    },[url, qryTxt, asyncOptions])

    const {data}=useFetch(uri, token, onTokenExpired, onServerError);
    const data2=AutocompleteOptions?.options?.data;
    const options=useMemo(()=>processData((data && data.data) || data2, onCreateOptions), [data, data2, onCreateOptions]);
    return (
        <Autocomplete
            {...restOptions}
            options={options || []}
            onInputChange={(e, txt)=>{
                clearTimeout(timeout);
                timeout=setTimeout(()=>{
                    setQryTxt(txt);
                }, timeoutValue||300);
            }}
            renderInput={(params) => <TextField 
                    margin="normal" 
                    fullWidth={AutocompleteOptions.fullWidth} 
                    {...params} 
                    {...AutocompleteOptions?.inputprops}
                    label={AutocompleteOptions.label} 
                    required={AutocompleteOptions?.required}
                />
            }  
        />
    )

}