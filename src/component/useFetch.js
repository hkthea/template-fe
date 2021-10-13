import { useEffect, useState, useRef } from "react";
import { BaseUrl, HttpTimeOut } from '../constants/config';
import axios from 'axios';
import { useDispatch } from "react-redux";
import moment from "moment";

export const useFetch= (url, token, onTokenExpired, onServerError, verifPass)=>{
    const dispatch = useDispatch();
    const isCurrent = useRef(true);
    const [currentUrl, setCurrentUrl]=useState('');
    const [state, setState] = useState({ data: null, loading: false, isError:true });    

    const fetchData=async (url)=>{
        if(!url)return false;
        if(currentUrl===url)return false;
        setCurrentUrl(url);
        const config={
            method:'GET',
            url,
            baseURL:BaseUrl,
            timeout:HttpTimeOut,
            responseType:'json',
            headers:{srawungToken:token}
        }
        isCurrent.current && setState({data:null, loading:true});
        axios.request(config).then(resp=>{
            const {data}=resp;
            
            if(data.error===0)
            {
                verifPass&&dispatch({type:'set-verify', payload:{verif:true, msg:null}});          
                isCurrent.current && setState({data:data.data, loading:false, isError:data.error});
            }
            else if(data.error===401)
            {                 
                onTokenExpired && onTokenExpired();
                isCurrent.current && setState({...state, loading:false});
            }
            else
            {
                onServerError && onServerError('Error', data.message, data);
                isCurrent.current && setState({...state, loading:false, isError:data.error});
            }
        }).catch(error=>{
            onServerError && onServerError('error', error.message, error)
            isCurrent.current && setState({...state, loading:false});
        })
    }

    useEffect(() => {
      return () => {
        // called when the component is going to unmount
        isCurrent.current = false;
      };
    }, []);
    
    useEffect(() => {        
        fetchData(url);
    }, [url]);
  
    return state;
}