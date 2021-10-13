import { put, call, select } from 'redux-saga/effects';
import { appPost, appPatch, appGet, appDelete } from '../api/caller';
import {sendNotification} from './utils';
// import {useFirebaseAuth} from '../../constants/config';
const useFirebaseAuth=false;

const post=async(data)=>await appPost(data).then(r=>r).catch(e=>e);
const get=async(data)=>await appGet(data).then(r=>r).catch(e=>e);
const patch=async(data)=>await appPatch(data).then(r=>r).catch(e=>e);
const _delete=async(data)=>await appDelete(data).then(r=>r).catch(e=>e);

function* processRespData(resp){
    const {data}=resp;
    if(parseInt(data.error)===401){
        if(useFirebaseAuth)
        {
            yield put({type:'user-not-registered'})
        }
        else
        {
            yield put({type:'sign-out-success'});
            return false;
        }
    }
    else if(data.message)
    {
        if(resp.isLoginNoFb){
            yield put({type:'sign-in-failed', payload:{msg:data.message}});
            return false;
        }else{
            yield sendNotification('error', data.message, 'Error');
            return false;
        } 
    }
    return data.data || data;
}

export function* doPost(aPayload){
    try {
        const apps=yield select(state=>state.Apps);
        // console.log(typeof aPayload.data);
        const payload=(!!aPayload.type && aPayload.type==='FormData')?aPayload:{...aPayload, data:{...aPayload.data, apps}};
        if(payload?.token){
            // const isLoginNoFb = payload?.isLoginNoFb || false;
            // const {token, ...oth}=payload;
            // const data=payload//{...oth, token}//token?{...payload, token}:payload;
            let resp=yield call(post, payload);
            resp.isLoginNoFb = false;
            return yield call(processRespData, resp);
        }
        else
        {
            const isLoginNoFb = payload?.isLoginNoFb || false;
            const {token}=yield select(state=>state.Auth);
            const data=token?{...payload, token}:payload;
            let resp=yield call(post, data);
            resp.isLoginNoFb = isLoginNoFb;
            return yield call(processRespData, resp);
        }
    } catch (error) {
        throw error;
    }
}

export function* doGet(aPayload){
    try {
        const payload={...aPayload};
        if(payload?.token)
        {
            const {token, ...oth}=payload;            
            const data={...oth, token};
            const resp=yield call(get, data);
            return yield call(processRespData, resp);
        }
        else{
            const {token}=yield select(state=>state.Auth);            
            const data=token?{...payload, token}:payload;
            const resp=yield call(get, data);
            return yield call(processRespData, resp);
        }
    } catch (error) {
        throw error;
    }
}

export function* doPatch(aPayload){
    try {
        const apps=yield select(state=>state.Apps);
        const payload={...aPayload, data:{...aPayload.data, apps}};
        const {token}=yield select(state=>state.Auth);
        const data=token?{...payload, token}:payload;
        const resp=yield call(patch, data);
        return yield call(processRespData, resp);
    } catch (error) {
        throw error;
    }
}

export function* doDelete(aPayload){
    try {
        const apps=yield select(state=>state.Apps);
        const payload={...aPayload, data:{...aPayload.data, apps}};
        const {token}=yield select(state=>state.Auth);
        const data=token?{...payload, token}:payload;
        const resp=yield call(_delete, data);
        return yield call(processRespData, resp);
    } catch (error) {
        throw error;
    }
}