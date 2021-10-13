import users from './pages/master/users';
import FormUsers from './pages/master/users/form';
import HomePage from './pages/home';
import MonthlyDashboardPage from './pages/monthly';
import profile from './pages/profile';
import AboutPage from './pages/about';
import DailyReportPage from './pages/report/daily';
import MonthlyReportPage from './pages/report/monthly';
import LogsReportPage from './pages/report/activity_logs';
import AllLogsReportPage from './pages/report/activity_logs/all';
// import {masterMapping} from '../../env';

export const ROUTING=[
    {
        url:'/dashboard/main',
        isExact:true, 
        level:0x1fff,
        page:HomePage
    },
    {
        url:'/dashboard/main/monthly',
        isExact:true, 
        level:0x1fff,
        page:MonthlyDashboardPage
    },
    {
        url:'/dashboard/report/daily',
        isExact:true, 
        level:0x1fff,
        page:DailyReportPage
    },
    {
        url:'/dashboard/report/monthly',
        isExact:true, 
        level:0x1fff,
        page:MonthlyReportPage
    },
    {
        url:'/dashboard/report/logs',
        isExact:true, 
        level:0x1fff,
        page:LogsReportPage
    },
    {
        url:'/dashboard/report/all_logs',
        isExact:true, 
        level:0x1ff0,
        page:AllLogsReportPage
    },
    {
        url:'/dashboard/master/user',
        isExact:true, 
        level:0x1f00,
        page:users
    },
    
    {
        url:'/dashboard/master/user/create',
        isExact:true, 
        level:0x1f00,
        page:FormUsers
    },
    {
        url:'/dashboard/master/user/edit',
        isExact:true, 
        level:0x1f00,
        page:FormUsers
    },    
    {
        url:'/dashboard/profile',
        isExact:true, 
        level:0x1fff,
        page:profile
    },
    {
        url:'/dashboard/about',
        isExact:true, 
        level:0x1fff,
        page:AboutPage
    },
]