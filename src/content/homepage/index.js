import React from 'react';
import { useDispatch } from 'react-redux';

export default ()=>{
    const dispatch = useDispatch();

    return (<button 
        onClick={()=>dispatch({type:'show-notifications', payload:{code:'error', message:'Test Oke', title:'Success'}})}
    >Notif</button>)
}