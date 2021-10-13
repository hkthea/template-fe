import {useFetch} from '../../../component/useFetch';
import { useDispatch, useSelector } from 'react-redux';

export const useMyFetch=(url)=>{
    const dispatch=useDispatch();
    const {token}=useSelector(state=>state.Auth);

    return useFetch(url, token, ()=>{
        dispatch({type:'sign-out'})
    }, (code, message, data)=>{
        dispatch({type:'show-notifications', payload:{code:'error', message, title:code}});
    }) 
} 