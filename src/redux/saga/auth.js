import { fork, takeEvery, put, all, call, select } from 'redux-saga/effects';
import {doGet, doPost} from './apiInterceptor';
import {sendNotification} from './utils';
import Decoder from 'jwt-decode';

const signinUrl=`auth/login`;
const signOutUrl=`auth/logout`;

function* doSignIn({payload})
{
    const { username, password}=payload;
    yield put({type:'show-loader'});
    try {
        const resp=yield call(doPost, {data:{username, password}, url:`${signinUrl}`, isLoginNoFb:true});
        if(resp)
        {        
            // const =resp;
            yield localStorage.setItem('token', resp);
            const user=Decoder(resp);
            console.log({user, resp});
            
            yield put({type:'sign-in-success', payload:{user, token:resp}} );
            yield sendNotification('success', 'Welcome to Webtelex', 'Success');
        }
    } catch (error) {
        yield sendNotification('error',error.message, 'Error');
    }
    yield put({type:'hide-loader'});
}

export function* login(){
    yield takeEvery('sign-in', doSignIn)
}

function* doLoadSession(){
    // check storage local
    const token=yield localStorage.getItem('token');
    if(token){
        yield put({type:'show-loader'});
        try {
            const data={token, url:`auth/me`};
            // verify token
            const resp = yield call(doGet, data);      
            if(resp)
            {
                yield put({type:'sign-in-success', payload:{user:resp, token}});
            }
            else
            {
                yield localStorage.setItem('token', '');
            }            
        } catch (error) {
            yield put({type:'error-load-session'});
        }
        yield put({type:'hide-loader'});
    }
    else
    {
        yield put({type:'sign-out-success'});
    }
}

export function* loadSession(){
    yield takeEvery('load-session', doLoadSession);
}

function* doSignOut({payload}){
    // const {token}=payload;
    const {token}=yield select(state=>state.Auth);
    if(token)
    {
        yield put({type:'show-loader'});
        try {
            const resp=yield call(doGet, {data:{}, url:`${signOutUrl}`, token});
            if(resp)
            {        
                yield localStorage.setItem('token','');
                yield put({type:'sign-out-success'} );
            }
        } catch (error) {
            yield sendNotification('error',error.message, 'Error');
        }
        yield put({type:'hide-loader'});
    }
    else
    {
        yield localStorage.setItem('token','');
        yield put({type:'sign-out-success'} );
    }
}

export function* signOut(){
    yield takeEvery('sign-out', doSignOut);
}

function* doSetNewPassword({payload}){
    yield put({type:'show-loader'});
    try{
        const resp=yield call(doPost, {data:{pass:payload.password}, url:payload.url});
        if(resp.oke)
        {
            yield put({type:'set-verify', payload:{verif:false, msg:"Berhasil Set Password, silahkan "}})
        }
        yield put({type:'hide-loader'});
    }catch(error){
        yield sendNotification('error',error.message, 'Error');
    }
}

export function* setNewPassWord(){
    yield takeEvery('set-new-password', doSetNewPassword)
}


export default function* rootSaga(){
    yield all([
        fork(login),
        fork(loadSession),
        fork(signOut),
        fork(setNewPassWord),
    ]);
}