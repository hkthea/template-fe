import { Box, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import TableData from './table';

export default ({data, loading, date})=>{
    const [edifly, typeb, email, incEdifly, incTypeb, incEmail]=useMemo(()=>{
        if(loading)return [[], [], [], [], [], []];
        if(!data)return [[], [], [], [], [], []];
        const {outEdifly, outTypeB, outEmail, incEdifly, incTypeB, incEmail}=data;
        return [outEdifly, outTypeB, outEmail, incEdifly, incTypeB, incEmail];
    }, [data, loading]);
    const allUser=useMemo(()=>{
        if(data?.all)return ' All Telex Address';
        return '';
    },[data])
    return (
        <React.Fragment>
            <Typography variant="h5">Outgoing Report</Typography>
            <TableData data={edifly} title={`EDIfly Traffic Report${allUser} Date: ${date}`} loading={loading}/>
            <TableData data={typeb} title={`TypeB Traffic Report${allUser} Date: ${date}`} loading={loading}/>
            <TableData data={email} title={`Email Traffic Report${allUser} Date: ${date}`} loading={loading} tableType="Email"/>
            <Box p={2}></Box>
            <Typography variant="h5">Incoming Report</Typography>
            <TableData data={incEdifly} title={`EDIfly Traffic Report${allUser} Date: ${date}`} loading={loading}/>
            <TableData data={incTypeb} title={`TypeB Traffic Report${allUser} Date: ${date}`} loading={loading}/>
            <TableData data={incEmail} title={`Email Traffic Report${allUser} Date: ${date}`} loading={loading} tableType="Email"/>
        </React.Fragment>        
    )
}