import React, { useState } from 'react';
import MyPage from '../../../../../component/myServerPage';
import moment from 'moment';
import numeral from 'numeral';
import { IconButton } from '@material-ui/core';
import { FaHandshake, FaUpload } from 'react-icons/fa';
import {ImgBaseUrl} from '../../../../../constants/config';

const COLUMNS=[    
    {
        selector:'_id',
        name:'Trx Id',
        wrap:true,
    },
    {
        selector:'total',
        name:'Total Transaction',
        wrap:true,
        right:true,
        format:({total})=>numeral(total).format('0,000.00')
    },
    {
        selector:'description',
        name:'Desc',
        wrap:true,
    },    
    {
        selector:'createdBy',
        name:'Created By',
        wrap:true,
        format:({createdBy, createdByAgent})=>createdByAgent?.username || createdBy?.username
    },
    {
        selector:'createdAt',
        name:'Created At',
        wrap:true,
        format:({createdAt})=>moment(createdAt).format('DD-MMM-YYYY HH:mm:ss')
    },    
]

export default ()=>{
    return (
        <MyPage  
            title="Transaction"
            boxPadding={4}
            url="api/v1/transaction"
            columns={COLUMNS}
        />
    )
}