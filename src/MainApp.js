import React, { useRef, useEffect } from 'react';
import MainRoute from './content/MainRoute';
import {Toast} from 'primereact/toast';
import {setToaster} from './toaster'
import LoadingOverlay from 'react-loading-overlay'
import { useDispatch, useSelector } from 'react-redux';
import { titleCfg } from './constants/config';

export default ()=>{
    const toaster = useRef(null);
    const dispatch=useDispatch();
    useEffect(() => {
        if(!!toaster.current){
            setToaster(toaster.current);
        }
    }, [toaster]);
    const {loader}=useSelector(state=>state.Utils);

    useEffect(()=>{
        dispatch({type:'load-params'});
        document.title=`${titleCfg}`;
    },[dispatch]);

    return (
        <React.Fragment>
            <LoadingOverlay 
                active={loader}
                spinner
                text="Loading"
                styles={{
                    overlay:(base)=>({
                        ...base,
                        zIndex:8888,
                        background:'rgba(2,31, 78,0.5)',
                        position:'fixed'
                    }),
                    wrapper:(base)=>({
                        ...base                        
                    }),
                    content:(base)=>({
                        ...base,
                        fontSize:35,
                        fontWeight:'bold'
                    })
                }}
            >
                <MainRoute/>
            </LoadingOverlay>
            <Toast ref={toaster} baseZIndex={9999} style={{width:420}}/>
        </React.Fragment>
    );
}