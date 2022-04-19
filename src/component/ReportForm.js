import React from 'react';
import DailyFormReport from './reports/dailyForm';
import MonthlyFormReport from './reports/monthlyForm';

export default ({title, url, repType, isDateRange, FetchComponent, onDataChange, printHeader, printFooter,
    onDateChange, onFilterChange})=>{
    return repType==='daily'?(
        <DailyFormReport 
            url={url} 
            repType={repType} 
            title={title} 
            isDateRange={isDateRange} 
            FetchComponent={FetchComponent}             
            printFooterReport={printFooter}
            printHeaderReport={printHeader}
            onDataChange={onDataChange}
            onDateChange={onDateChange}
            onFilterChange={onFilterChange}
        />
    ):(
        <MonthlyFormReport 
            url={url} 
            repType={repType} 
            title={title} 
            isDateRange={isDateRange} 
            FetchComponent={FetchComponent}             
            printFooterReport={printFooter}
            printHeaderReport={printHeader}
            onDataChange={onDataChange}
            onDateChange={onDateChange}
            onFilterChange={onFilterChange}
        />
    )
}