import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import LoginPage from './login/index';
import MemberPages from './pages';
import SplashPages from '../../splash'

const UserPage=({user})=>{
    return (
        <BrowserRouter basename="/member">
            <Switch>
                <Route exact path="/">
                    {
                        !!user?<Redirect to="/dashboard"/>:<Redirect to="/login"/>
                    }
                </Route>            
                <Route path="/dashboard">
                    {
                        !!user?<MemberPages/>:<Redirect to="/login"/>
                    }
                </Route>
                <Route path="/login">
                    {
                        !!user?<Redirect to="/dashboard"/>:<LoginPage/>
                    }
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default ()=>{
    const dispatch = useDispatch();
    const {user, firstime} = useSelector(state => state.Auth);  
    useEffect(() => {
        dispatch({type:'load-session'});
        dispatch({type:'check-version'});        
    }, [])

    if(firstime)return <SplashPages />
    return <UserPage user={user}/>       
}