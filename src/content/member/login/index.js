import React from 'react';
import LeftContent from './left';
import FormContent from './form';
import './style.css';
// import { RootUrl, ImgBaseUrl } from '../../../constants/config';
// import moduleName from '/images/logo.png';
export default ()=>{
    return (
        <React.Fragment>
            <div className="loginBackground"></div>
            <div  style={{marginRight:0, display:'flex', flexDirection:'row',
                justifyContent:'center', height:'100vh'  }}>            
                <div style={{display:'flex'}}>
                    <FormContent />
                </div>
            </div>
        </React.Fragment>
    )
}