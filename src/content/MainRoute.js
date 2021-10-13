import React from 'react';
import {  Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import MemberArea from './member';
import Homepage from './homepage'

export default ()=>{
    
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/member"/>
                </Route>
                <Route path="/member" >
                    <MemberArea/>
                </Route>                
                <Route path="/homepage">
                    <Homepage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}