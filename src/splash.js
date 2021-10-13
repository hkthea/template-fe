import React from 'react';
import { sidebarColorCfg, splashLogoCfg } from './constants/config';
import './splash.css';

export default ()=>{
    return (
        <React.Fragment>            
            <div className="splash-container"></div>
            <div className="splash-body">
                <div className="splash-content">
                    <img src={splashLogoCfg} width="150" />
                    <h2 style={{color:sidebarColorCfg}}>Now Loading..</h2>
                </div>
            </div>
        </React.Fragment>
    )
}