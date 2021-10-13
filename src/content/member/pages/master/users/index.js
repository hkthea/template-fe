import React from 'react';
import MyPage from '../../../../../component/myServerPage';
import {levelToRoles} from './roles'
import moment from 'moment';
const COLUMNS=[
    {
        selector:'username',
        name:'Username',
        wrap:true,
    },
    {
        selector:'routing',
        name:'Routing',
        wrap:true,
    },
    {
        selector:'name',
        name:'Name',
        wrap:true,
    },
    {
        selector:'email',
        name:'Email',
        wrap:true,
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
            title="Users"
            boxPadding={4}
            url="api/v1/users/paging"
            columns={COLUMNS}
            editPathName='/dashboard/master/user/edit'
            onRowsData={(row)=>{
                const {routing, ...rest}=row;
                return {...row, routing:routing.join(' ')};
            }}
            addButtonAction={(history)=>()=>{
                history.push('/dashboard/master/user/create')
            }}
        />
    )
}