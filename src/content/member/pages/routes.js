import React, { useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {ROUTING_MENU} from '../menu';
import './style.css'


export default ({level})=>{
    const defaultRedirect=useMemo(()=>{
        return ((level&0xf)>0) ? '/dashboard/telex/inbox':'/dashboard/main';        
    },[level])
    return (
        <Switch>
            <Route exact path="/dashboard">
                <Redirect to={defaultRedirect} />
            </Route>
            
            {
                ROUTING_MENU.map((route)=>(route.level & level) > 0 && !!route.page && (
                        <Route exact={route.isExact} path={route.url} key={route.url} component={route.page} />
                            
                ))
            }                
            <Route path='/dashboard/*'>
                <div className="pageNotFound">
                </div>
            </Route>
        </Switch>
    )
}