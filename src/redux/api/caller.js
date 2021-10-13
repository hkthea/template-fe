import axios from 'axios';
import { BaseUrl, HttpTimeOut } from '../../constants/config';
import qs from 'querystring';

const useFirebaseAuth=false;

const Call = async (method, url, data={}, token='', headers={}, baseUrl=BaseUrl, timeout=HttpTimeOut, resp='json', options={})=>{
    const config={
        ...options,
        method,
        url,
        baseURL:baseUrl,
        data,
        timeout,
        responseType:resp, 
        headers:{...headers, srawungToken:token, useFirebaseAuth}
    }
    return await axios.request(config)
}

export const appPost =async (body)=>{
    const {url, data, token, headers, baseUrl, timeout, resp}=body;
    return await Call('POST', url, data, token, headers, baseUrl, timeout, resp);
}

export const appGet =async (body )=>{
    const {url, data, token, headers, baseUrl, timeout, resp}=body;
    const params=qs.stringify(data);
    return await Call('GET', url, params, token, headers, baseUrl, timeout, resp);
}

export const appDelete =async (body)=>{
    const {url, data, token, headers, baseUrl, timeout, resp}=body;
    return await Call('DELETE', url, data, token, headers, baseUrl, timeout, resp);
}

export const appPatch =async (body)=>{
    const {url, data, token, headers, baseUrl, timeout, resp}=body;
    return await Call('PATCH', url, data, token, headers, baseUrl, timeout, resp);
}