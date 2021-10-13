import React, { useState } from 'react';
import MyPage from '../../../../../component/myServerPage';
import moment from 'moment';
import numeral from 'numeral';
import { IconButton } from '@material-ui/core';
import { FaHandshake, FaUpload } from 'react-icons/fa';
import {ImgBaseUrl} from '../../../../../constants/config';

const COLUMNS=[   
    {
        selector:'createdAt',
        name:'Created At',
        wrap:true,
        format:({createdAt})=>moment(createdAt).format('DD-MMM-YYYY HH:mm:ss')
    },  
    {
        selector:'transaction_id',
        name:'Transaction Id',
        wrap:true,
        compact:true,
        format:({transaction_id})=>transaction_id?._id
    }, 
    {
        selector:'transaction_id',
        name:'Desc',
        wrap:true,
        format:({transaction_id})=>transaction_id?.description
    }, 
    {
        selector:'total',
        name:'Total',
        wrap:true,
        right:true,
        width:'150px',
        format:({total})=>numeral(total).format('0,000.00')
    },
    {
        selector:'beforeDeposit',
        name:'Before Deposit',
        wrap:true,
        right:true,
        width:'150px',
        format:({beforeDeposit})=>numeral(beforeDeposit).format('0,000.00')
    },
    {
        selector:'afterDeposit',
        name:'After Deposit',
        wrap:true,
        right:true,
        width:'150px',
        format:({afterDeposit})=>numeral(afterDeposit).format('0,000.00')
    },
    {
        selector:'createdBy',
        name:'Created By',
        wrap:true,
        format:({createdBy, agent_user_id})=>agent_user_id?.username || createdBy?.username
    },    
     
]

export default ()=>{
    return (
        <MyPage  
            title="Statement"
            boxPadding={4}
            url="api/v1/statement"
            columns={COLUMNS}
        />
    )
}