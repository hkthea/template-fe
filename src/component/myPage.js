import React, { useEffect, useMemo, useState } from 'react';
import propsTypes from 'prop-types'
import { Box, Container, Divider, IconButton, Paper, Typography } from '@material-ui/core';
import Table from 'react-data-table-component'
import { FaEdit } from 'react-icons/fa';
import { titleCfg } from '../constants/config';

const MyPage = ({boxPadding, title, searchComponent, columns, editPathName, tableProps, data, loading, pagination, 
    otherActions, doChangeEditData, conditionalRowStyles, onRowClicked })=>{
    // console.log({tableProps})
    const aColumns=useMemo(()=>{
        if(!!editPathName || !!otherActions){
            const s={
                selector:'_id',
                name:'Action',
                wrap:true,
                compact:true,
                format:(row)=>{
                    const { history, successCallback, dispatch, ...data}=row;
                    const d=!!doChangeEditData && (typeof doChangeEditData ==='function')?doChangeEditData(data):data;
                    const route_state={data:d, id:data._id, isCreate:false};
                    const editPath=editPathName;
                    
                    return (
                        <div>
                            {
                                !!editPathName && (<IconButton size="small" title="Edit" onClick={()=>{                     
                                    history.push({
                                        pathname:editPath,
                                        state:route_state                   
                                    }) 
                                }} >
                                    <FaEdit/>
                                </IconButton>)                            
                            }
                            {
                                otherActions && otherActions(row)
                            }
                        </div>
                    )
                }
            }
            if(!!otherActions)s.width='150px';
            return [...columns, s];
        }
        return columns;
    },[editPathName, columns])

    useEffect(()=>{
        document.title=`${titleCfg} - ${title}`;
    },[])

    return (
        <Container disableGutters maxWidth={false}>
            <Paper style={{display:'flex', flexDirection:'column', minHeight:'calc(100vh - 68px)'}}>        
                <Box p={boxPadding}>
                    <Typography variant="h5" style={{marginBottom:10}}> {title} </Typography>
                    <Divider/>
                    {
                        !!searchComponent && (
                            <Box p={2}>
                                { searchComponent }
                            </Box>
                        )
                    }
                    <Table 
                        {...tableProps}
                        {...pagination}
                        conditionalRowStyles={conditionalRowStyles}
                        onRowClicked={onRowClicked}
                        dense={true}
                        striped
                        noHeader={true}
                        highlightOnHover
                        columns={aColumns}
                        progressPending={loading}
                        data={data}                    
                    />
                
                </Box>
            </Paper>
        </Container>
    )
}

MyPage.defaultProps={
    boxPadding:4,
    title:'Title',
    columns:[],
    rowPerPage:10,
    loading:false,
    data:[],
    pagination:{}
}

MyPage.propsTypes={
    boxPadding:propsTypes.number,
    title:propsTypes.string.isRequired,
    editPathName:propsTypes.string,
    columns:propsTypes.arrayOf(propsTypes.object),
    columnsGroup:propsTypes.element,
    searchComponent:propsTypes.element,
    rowPerPage:propsTypes.number,
    pagination:propsTypes.object,
    tableProps:propsTypes.instanceOf(Table),
    data:propsTypes.arrayOf(propsTypes.object),
    loading:propsTypes.bool
}

export default MyPage;