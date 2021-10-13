import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Utils from './utils';
import Apps from './apps';
import Auth from './auth';

export default (history)=> combineReducers({
    router:connectRouter(history),
    Utils,
    Apps,
    Auth,
})