/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect, useMemo, useState } from 'react';
import MyPage from '../myFormContainer';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import TableSection from './component/table';
import { Button } from '@material-ui/core';
import FilterData from './component/filter';

export default ({url, title, repType, FetchComponent, printHeaderReport, printFooterReport, onDataChange,
    onFilterChange, onDateChange}) => {
    const [timestamp, setTimestamp]=useState(moment().unix());
    const [startDate, setStartDate]=useState(moment());
    const [endDate, setEndDate]=useState(moment().add(1, 'day'));    
    const [selectedValues, setSelectedValues]=useState([]);    
    const [filterLists, setFilterLists]=useState([]);
    const curUrl=useMemo(()=>{
        return `${startDate.format('DD-MMM-YYYY')}/${endDate.format('DD-MMM-YYYY')}`;
    },[startDate, endDate]);
    const [uri, setUri]=useState(curUrl);
    const maxEndDate=useMemo(()=>{
        const nextWeek=moment(startDate).add(7,'day');
        return (nextWeek.unix() > moment().add(1,'day').unix())?moment().add(1, 'day'):nextWeek;
    }, [startDate]);

    useEffect(()=>{
        onFilterChange && typeof onFilterChange ==='function' && onFilterChange(selectedValues);
    }, [selectedValues])

    useEffect(() => {
        onDateChange && typeof onDateChange ==='function' && onDateChange(startDate, endDate);
    }, [startDate, endDate])

    const DailyBtn=()=>(
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker 
                autoOk
                label="Start Date"
                value={startDate}
                format='DD-MMM-YYYY'
                onChange={adate => {
                    setStartDate(adate);
                    const nextWeek=moment(adate).add(7,'day');
                    if(nextWeek.unix() < moment(endDate).unix()){
                        setEndDate(nextWeek);
                    }else if(moment(adate).unix() >= moment(endDate).unix()){
                        setEndDate(moment(adate).add(1,'day'));
                    }
                }}
                inputVariant='outlined'
                size='small'  
                style={{marginInline: 5}}                      
                maxDate={moment()}
            />
            <DatePicker 
                autoOk
                label="End Date"
                value={endDate}
                format='DD-MMM-YYYY'
                onChange={adate => {
                    setEndDate(adate)
                }}
                inputVariant='outlined'
                size='small'  
                style={{marginInline: 5}}                      
                maxDate={maxEndDate}
                minDate={moment(startDate).add(1,'day')}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={()=>{
                    setUri(curUrl);
                    setTimestamp(moment().unix());
                }}
            >
                Search
            </Button>
        </MuiPickersUtilsProvider>
    );
    return (
        <MyPage title={title}>
            <div style={{display:'flex', flexDirection:'column', paddingBlock:30}}>
                <div style={{display:'flex', flexDirection:'row', marginBlock:5}}>
                    <DailyBtn />                  
                </div>
                <FilterData 
                    lists={filterLists} 
                    idReport={`${url}${repType}`}
                    onFilterValueChange={fval=>{
                        // console.log({fval})
                        setSelectedValues(fval);
                    }}
                />
                <TableSection 
                    date={uri} 
                    baseUrl={url} 
                    FetchComponent={FetchComponent}
                    repType={repType} 
                    timestamp={timestamp}
                    selectedValue={selectedValues}
                    setFilterLists={setFilterLists}
                    printHeader={printHeaderReport}
                    printFooter={printFooterReport}
                    onDataChange={onDataChange}
                />
            </div>
        </MyPage>
    )
}