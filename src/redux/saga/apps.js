import { put,  takeEvery, all, fork, call } from 'redux-saga/effects';
import {doGet} from './apiInterceptor';
import {sendNotification } from './utils';
import {RootUrl} from '../../constants/config';

function* doGetParams(){
    yield put({type:'show-loader'});
    try {
        const resp=yield call(doGet, {baseUrl:RootUrl, url:'params.json', token:'', data:{}} );
        if(resp){
            yield put({type:'set-apps', payload:resp});
        }
    } catch (error) {
        sendNotification('error', error.message, 'Error');
    }    
    yield put({type:'hide-loader'});
}

function* doCheckVersion(){
    yield put({type:'show-loader'});
    try {
        const resp=yield call(doGet, {url:'/api/v1/version', data:{}} );
        if(resp){
            yield put({type:'set-version', payload:resp});
        }
    } catch (error) {
    }    
    yield put({type:'hide-loader'});
}

export function* getParams(){
    yield takeEvery('load-params', doGetParams);
}

export function* checkVersion(){
    yield takeEvery('check-version', doCheckVersion);
}

export default function* rootSaga(){
    yield all([
        fork(getParams),
        // fork(getDeposit),
        fork(checkVersion),
    ])
}