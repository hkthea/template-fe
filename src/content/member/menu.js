import React from 'react';
import { FaUsers, FaAtlas } from 'react-icons/fa';
import { GiHouse } from 'react-icons/gi';
import {  RiFile4Line, RiFileChart2Line, RiFileChartLine, RiFileDamageLine, RiFileForbidLine,  RiLightbulbFlashLine } from 'react-icons/ri';
import {ROUTING} from './routing';

const ICON_SIZE=24;

export const MENU_INDEXED={};
export const MEMBER_MENU=[
    {
        url:'#',
        name:'Dashboard',
        id:'',
        icon:<GiHouse size={ICON_SIZE} />,
        childs:[],
        level:0x1FFFF,
        selected:false,
        active:true,
        isOpened:false,
        isExact:true,
    },
    {
        url:'#',
        name:'Master',
        id:'',
        icon:<FaAtlas size={ICON_SIZE} />,
        childs:[                         
            {
                url:'/dashboard/master/user',
                name:'Users',
                id:'',
                icon:<FaUsers size={ICON_SIZE} />,
                childs:[],
                level:0x1FFF0,
                selected:false,
                active:true,
                isOpened:false,
                isExact:true,
            },                               
        ],
        level:0x1FFF0,
        selected:false,
        active:true,
        isOpened:false,
        isExact:true,
    },   
   
    {
        url:'#',
        name:'Reports',
        id:'',
        icon:<RiFile4Line size={ICON_SIZE} />,
        childs:[
            {
                url:'/dashboard/report/daily',
                name:'Daily',
                id:'',
                icon:<RiFileChartLine size={ICON_SIZE} />,
                childs:[],
                level:0x1FFFF,
                selected:false,
                active:true,
                isOpened:false,
                isExact:true,
            },
            {
                url:'/dashboard/report/monthly',
                name:'Monthly',
                id:'',
                icon:<RiFileChart2Line size={ICON_SIZE} />,
                childs:[],
                level:0x1FFFF,
                selected:false,
                active:true,
                isOpened:false,
                isExact:true,
            },
            {
                url:'/dashboard/report/logs',
                name:'Activity Logs',
                id:'',
                icon:<RiFileForbidLine size={ICON_SIZE} />,
                childs:[],
                level:0x1FFFF,
                selected:false,
                active:true,
                isOpened:false,
                isExact:true,
            },
            {
                url:'/dashboard/report/all_logs',
                name:'Users Activity Logs',
                id:'',
                icon:<RiFileDamageLine size={ICON_SIZE} />,
                childs:[],
                level:0x1FFF0,
                selected:false,
                active:true,
                isOpened:false,
                isExact:true,
            },
        ],
        level:0x1FFFF,
        selected:false,
        active:true,
        isOpened:false,
        isExact:true,
    },
    {
        url:'/dashboard/about',
        name:'About',
        id:'',
        icon:<RiLightbulbFlashLine size={ICON_SIZE} />,
        childs:[],
        level:0x1ffff,
        selected:false,
        active:true,
        isOpened:false,
        isExact:true,
    },
]

export const ROUTING_MENU=ROUTING;