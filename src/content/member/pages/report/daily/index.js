import MomentUtils from '@date-io/moment';
import { Box, Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { RiFileExcel2Line, RiFileSearchLine } from 'react-icons/ri';
import MyPage from '../../../../../component/myFormContainer';
import { useMyFetch } from '../../../component/useMyFetch';
import { exportExcel } from './report';
import TablesData from './tables';  

export default ()=>{
    const [date, setDate]=useState(moment().subtract(1,'d'));
    const [search, setSearch]=useState({periode:date, timestamp:moment().unix()});
    const url=useMemo(()=>{
        const {periode, timestamp}=search;
        return `api/v1/report/excel_data/daily/${periode.format('DD-MMM-YYYY')}?timestamps=${timestamp}`;
    },[ search ]);
    const {data, loading}=useMyFetch(url);

    return (
        <MyPage
            title="Daily Report"
        >
            <Box p={2}>
                <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                    <div style={{display:'flex', flexDirection:'row', marginLeft:'auto'}}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                                label="Periode"
                                value={date}
                                onChange={(newDate)=>setDate(newDate)}
                                format={"DD-MMM-YYYY"}
                                inputVariant="outlined"
                                size="small"
                                autoOk
                                style={{marginRight:15}}
                            />
                        </MuiPickersUtilsProvider>
                        <Button 
                            variant="outlined" 
                            color="primary"
                            onClick={()=>{
                                setSearch({periode:date, timestamp:moment().unix()});
                            }}
                            startIcon={<RiFileSearchLine size={16}/>}
                            style={{marginRight:15, width:140}}
                        >
                            View
                        </Button>
                        <Button 
                            variant="outlined" 
                            onClick={()=>{
                                if(!data)
                                {
                                    window.alert('Please View Report First then Export!');
                                    return false;
                                }
                                const {outEdifly, outTypeB, outEmail, incEdifly, incTypeB, incEmail, title}=data;
                                exportExcel(outEdifly, outTypeB, outEmail, incEdifly, incTypeB, incEmail, title, search.periode);
                            }}
                            startIcon={<RiFileExcel2Line size={16}/>}
                            style={{marginRight:15, width:140, color:green[800], borderColor:green[800]}}
                        >
                            Export Excel
                        </Button>
                    </div>
                    <div style={{flexGrow:1}}>
                        <TablesData data={data} loading={loading} date={search.periode.format('DD-MMM-YYYY')}/>
                    </div>
                </div>
            </Box>
        </MyPage>
    )
}