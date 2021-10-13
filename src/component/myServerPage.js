import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyPage from './myPage';
import {useFetch} from './useFetch';
import { useSelector, useDispatch } from 'react-redux';
import SubHeaderComp from './subheader'
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const MyServerPage= ({url, myPageProps, searchVal, parentRefresh, expandComponent, addButtonAction, successCallback, onRowsData, otherButtons, condStyle, 
    onRowClicked, noLoading, dataTableProps, ...rest})=>{
    const [page,setPage]=useState(1);
    const [perPage, setPerPage]=useState(10);   
    const dispatch = useDispatch();
    const history = useHistory();
    const {token}=useSelector(state=>state.Auth);
    const [searchTxt, setSearchTxt]=useState('');
    const [searchValue, setSearchValue]=useState('');
    const [refresh, setRefresh]=useState(0);
    const [tempRows, setTempRows]=useState([]);
    const [tempTotal, setTempTotal]=useState(0);
    const search=useMemo(()=>{
        if(!searchVal)return '';
        if(typeof searchVal ==='object')return JSON.stringify(searchVal);
        if(typeof searchVal ==='string')return searchVal;
        return '';
    },[searchVal]);

    const uri=useMemo(()=>{
        const r=parentRefresh>refresh?parentRefresh:refresh;
        return `${url}?page=${page}&perPage=${perPage}&search2=${search}&search=${searchValue}&refresh=${r}`;
    },[url, page, perPage, search, searchValue, refresh, parentRefresh]);

    const {data, loading}=useFetch(
        uri, token, 
        ()=>dispatch({type:'sign-out'}), 
        (title, message, dt)=>dispatch({type:'show-notifications', payload:{code:'error', message, title, timeout:3000}})
    );

    const [rows, total]=useMemo(()=>{
        if(!data)return [tempRows, tempTotal];
        const {data:rows, total}=data;
        const dt=rows.map((row)=>{
            const upRow=onRowsData && (typeof onRowsData==='function') ? onRowsData(row):row;
            return {...upRow, history, dispatch, successCallback};
        })
        setTempRows(dt);
        setTempTotal(total);
        return [dt, total];
    },[data, successCallback, onRowsData])

    const expandComp=useMemo(()=>{
        if(!expandComponent) return {};
        return {expandableRowsComponent:expandComponent, expandableRows:true, expandOnRowClicked:true};
    },[expandComponent])

    return (
        <MyPage 
            {...rest}
            pagination={{
                pagination:true, 
                paginationServer:true, 
                paginationTotalRows:total,
                onChangeRowsPerPage:(pp, pg)=>{
                    setPerPage(pp);
                    setPage(pg);
                },
                onChangePage:(pg)=>setPage(pg)
            }}
            onRowClicked={onRowClicked}
            tableProps={{
                ...dataTableProps,
                ...expandComp,
                subHeader:true, 
                subHeaderComponent:<SubHeaderComp 
                    withSearch={!rest.searchComponent}  
                    onClearSearch={()=>{
                        setSearchTxt('');
                        setSearchValue('');
                    }}
                    onRefreshClicked={()=>{
                        setRefresh(moment().unix())
                    }}    
                    onSearchTyping={(txt)=>setSearchTxt(txt)}
                    onSearchBtnClicked={()=>setSearchValue(searchTxt)}
                    addButton={!!addButtonAction}
                    addButtonAction={!!addButtonAction && addButtonAction(history)}
                    otherBtn={otherButtons}
                />
            }}
            loading={!noLoading && loading}
            data={rows}
        />
    )
}

MyServerPage.propTypes={
    ...MyPage.propsTypes,
    url:PropTypes.string,
    searchVal:PropTypes.any,
    expandComponent:PropTypes.element,
    addButtonAction:PropTypes.func,
    successCallback:PropTypes.func
}

export default MyServerPage;