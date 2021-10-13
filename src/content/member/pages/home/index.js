import { Box,  Paper } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import MyPage from '../../../../component/myFormContainer';
import { useMyFetch } from '../../component/useMyFetch';
import CurrentPie from './current_pie';
import CurrentChart from './current_chart';

export default ()=>{
    
    const [date, setDate]=useState(moment());
    const url=useMemo(()=>{
        return `api/v1/statistic/dashboard/daily/${date?.format('DD-MMM-YYYY')}`;
    },[date]);

    const {data, loading}=useMyFetch(url);
    
    return (
        <MyPage  
            title="Dashboard - Daily"
            boxPadding={4}                       
        >            
            <div style={{minHeight:'calc(85vh - 100px)', padding:30, display:'flex', flexDirection:'column'}}>
                <div style={{display:'flex', flexDirection:'row-reverse', paddingBottom:25}}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            value={date}
                            onChange={(newDate)=>setDate(newDate)}
                            label="Periode"
                            format={"DD-MMM-YYYY"}
                            autoOk
                            inputVariant="outlined"
                            size="small"
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div style={{flexGrow:1}}>
                    <Paper>
                        <Box p={4}>
                            <CurrentPie data={data} loading={loading} />
                        </Box>
                    </Paper>
                    <Box p={2}/>
                    <Paper>
                        <Box p={4}>
                            <CurrentChart data={data} loading={loading}/>
                        </Box>
                    </Paper>
                </div>
            </div>
        </MyPage>
    )
}