import React from 'react';
import { useSelector } from 'react-redux';
import {RootUrl} from '../../../constants/config';

export default ()=>{
    return (
        <div style={{display:'flex', height:'98vh',  width:'100%', justifyContent:'center', flexGrow:1, alignItems:'center'}}>
            <img src={RootUrl+"/images/logo.png"} style={{maxWidth:'80%', maxHeight:'70vh'}} />
        </div>
    )
}