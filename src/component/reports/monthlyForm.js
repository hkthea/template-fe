/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect, useMemo, useState } from 'react';
import MyPage from '../myFormContainer';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import TableSection from './component/table';
import FilterData from './component/filter';

export default ({url, title, repType, FetchComponent, printHeaderReport, printFooterReport, onDataChange,
    onDateChange, onFilterChange}) => {
    const [timestamp, setTimestamp]=useState(moment().unix());
    const [startDate, setStartDate]=useState(moment().subtract(1,'day'));
    const [selectedValues, setSelectedValues]=useState([]);    
    // const [values, setValues]=useState([]);
    const [filterLists, setFilterLists]=useState([]);
    const curUrl=useMemo(()=>{
        return `${startDate.format('MMM-YYYY')}`;
    },[startDate]);
    const [uri, setUri]=useState(curUrl);

    useEffect(()=>{
        onFilterChange && typeof onFilterChange ==='function' && onFilterChange(selectedValues);
    }, [selectedValues])

    useEffect(() => {
        onDateChange && typeof onDateChange ==='function' && onDateChange(startDate);
    }, [startDate])

    const DailyBtn=()=>(
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker 
                autoOk
                label="Month"
                value={startDate}
                views={['year', 'month']}
                format='MMM-YYYY'
                onChange={adate => {
                    setStartDate(adate);
                    setUri(adate.format('MMM-YYYY'));
                    setTimestamp(moment().unix());
                }}
                inputVariant='outlined'
                size='small'  
                style={{marginInline: 5}}                      
                maxDate={moment()}
            />
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
                    printFooter={printFooterReport}
                    printHeader={printHeaderReport}
                    onDataChange={onDataChange}
                    repType={repType} 
                    timestamp={timestamp}
                    selectedValue={selectedValues}
                    setFilterLists={setFilterLists}
                />
            </div>
        </MyPage>
    )
}