import { put,  takeEvery, all, fork, call, throttle } from 'redux-saga/effects';
import {doPost} from './apiInterceptor';
import {sendNotification, showDialog} from './utils';

function* doSave({payload}){
    const {token, data, history, url, callbackPath, successCallback, type}=payload;
    yield put({type:'show-loader'});
    try {
        const resp=yield call(doPost, {url, data, token, type} );
        if(resp){
            if(typeof(successCallback)==='function')
            {
                console.log('Callback',{callbackPath});        
                yield successCallback();
            }
            if(callbackPath!=='#') yield history.push(callbackPath);
        }
    } catch (error) {
        sendNotification('error', error.message, 'Error');
    }    
    yield put({type:'hide-loader'});
}

export function* save(){
    yield throttle(2000, 'save', doSave)
}

function* doDelete({payload}){
    const { notifValue, _id, refreshTable, url }=payload;
    try {
        const yes=yield call(showDialog, 'Konfirmasi', 'Apa Anda Yakin akan Menghapus data '+notifValue+'?', 'show-confirm-dialog');
        if(yes.type==='dialog-confirm-yes'){
            yield put({type:'show-loader'});
            const uri=`${url}/delete/${_id}`;
            const resp=yield call(doPost, {url:uri, data:{}} );
            if(resp){
                yield refreshTable();
            }
        }
    } catch (error) {
        sendNotification('error', error.message, 'Error');
    }
    yield put({type:'hide-loader'});
}

export function* MasterDelete(){
    yield takeEvery('delete',doDelete);
}

export default function* rootSaga(){
    yield all([
        fork(save),
        fork(MasterDelete)
    ])
}