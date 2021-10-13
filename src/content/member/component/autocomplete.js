import React from 'react';
import Autocomplete from '../../../component/autocomplete';
import {useSelector, useDispatch} from 'react-redux';

export default ({url, onCreateOptions, options, ...less})=>{
    const {token}=useSelector(state=>state.Auth);
    const dispatch=useDispatch();
    return <Autocomplete         
                AutocompleteOptions={{...options, ...less}}
                token={token}
                onCreateOptions={onCreateOptions}
                url={url}
                onTokenExpired={()=>{
                    dispatch({type:'sign-out'});
                }}
                onServerError={(code, message, error)=>{
                    dispatch({type:'show-notifications', payload:{code:'error', message, title:'Error', timeout:3000}})
                }}
            />
}