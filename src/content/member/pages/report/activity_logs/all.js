import React from 'react';
import MyPage from '../../../../../component/myServerPage';
import moment from 'moment';
const COLUMNS=[
    {
        selector:'user_id',
        name:'User',
        wrap:true,
        width:'140px',
        compact:true,
        format:({user_id})=>user_id?.username || '-'
    },
    {
        selector:'log',
        name:'Log',
        wrap:true,
        compact:true
    },
    {
        selector:'ip_address',
        name:'IP Address',
        wrap:true,
        width:'120px',
        compact:true
    },
    {
        selector:'createdAt',
        name:'Created At',
        wrap:true,
        width:'180px',
        compact:true,
        format:({createdAt})=>moment(createdAt).format('DD-MMM-YYYY HH:mm:ss')
    },        
]

export default ()=>{
    return (
        <MyPage  
            title="Activity Logs"
            boxPadding={4}
            url="api/v1/activity_logs/all"
            columns={COLUMNS}            
        />
    )
}