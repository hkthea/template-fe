import {all} from 'redux-saga/effects';
import Utils from './utils';
import Auth from './auth';
import Master from './master';
import Apps from './apps';

export default function* rootSaga(){
    yield all([
        Utils(),
        Auth(),
        Master(),
        Apps(),
    ])
}