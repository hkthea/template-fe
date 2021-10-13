import { take, put, race, takeEvery, all, fork, select } from 'redux-saga/effects';
// import {NotificationManager} from 'react-notifications';
import {getToaster} from '../../toaster'

export function* sendNotification(notifType, notifMessage, title=false, timeout=3000)
{
    const toaster=yield getToaster();
    if(toaster)
    {
        yield toaster.show({severity:notifType, detail:notifMessage, summary:title || notifType?.toUpperCase(), life:timeout});        
    }
}

export function* showDialog(title, message, action='show-dialog'){
    yield put({type:action, payload:{title, message}});

    const {yes, no}=yield race({
        yes:take('dialog-confirm-yes'),
        no:take('dialog-confirm-no')
    });
    console.log({yes});
    
    yield put({type:'hide-dialog'});
    return no || yes;
}

function* doSendNotif({payload}){
    const {code, message, title, timeout}=payload;
    yield sendNotification(code, message, title, timeout);
}

export function* sendNotifSaga(){
    yield takeEvery('show-notifications', doSendNotif);
}

export default function* rootSaga(){
    yield all([
        fork(sendNotifSaga)
    ])
}