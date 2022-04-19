/* eslint-disable react-hooks/exhaustive-deps */
import { Paper, Table, TableCell as TD, TableContainer, TableHead, TableRow, TableBody, IconButton, withStyles } from '@material-ui/core';
import {amber, blueGrey, green} from '@material-ui/core/colors';
import React, { useEffect, useMemo, useState } from 'react';
// import {useMyFetch} from '../../component/useMyFetch';
import moment from 'moment';
import {RiFileExcel2Line, RiPrinterLine, RiRefreshLine} from 'react-icons/ri'
import numeral from 'numeral';
import PrintBtn from './printBtn';
import {ExportExcel} from './excel_exporter';
const TableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#333',
      color: theme.palette.common.white,
      fontSize:'0.8rem',
      padding: 5,
      borderInline:'solid 1px white',
      borderInlineEnd:'0px'
    },
    body: {
      fontSize: '0.75rem',
      padding: 5,
      borderInline:'solid 1px #e0e0e0',
      borderInlineEnd:'0px'
    },
}))(TD);

export default ({date, repType, baseUrl,  timestamp, FetchComponent, setFilterLists, selectedValue, 
    printHeader, printFooter, onDataChange}) => {
    const [refresh, setRefresh]=useState(moment().unix());

    const uri=useMemo(()=>{
        return `${baseUrl}/${repType}/${date}?timestamp=${refresh}&pt=${timestamp}`;
    },[baseUrl, repType, date, refresh, timestamp]);

    const {data:reports}=FetchComponent && typeof FetchComponent === 'function' && FetchComponent(uri);

    const getValue=(row, cell)=>{
        const {type, name, field, format}=cell;
        const val = (!!field)?(row[name] && row[name][field]) || '-' : row[name];
        switch (type) {
            case 'string':
                return val;
            case 'time':
                return !!val?moment(val).format(format):'-';
            case 'number':
                return numeral(val).format('0,000');
            default:
                return val;
        }
    }

    const {header, fields, data}=useMemo(()=>{
        if(!reports)return {header:[], fields:[], data:[]};
        return reports;
    },[reports]);

    const [filteredData, total]=useMemo(()=>{
        if(!data || !Array.isArray(data))return [];
        
        const fltr=data.filter(row => {
            let result = true;
            for (let iii = 0; iii < selectedValue.length; iii++) {
                const {index, value, filter_string} = selectedValue[iii];
                const cell = fields[index];
                if(!cell)continue;
                const v = getValue(row, cell);
                if((filter_string && value==='') || (value === 'ALL' && !filter_string)){
                    continue
                } 
                if(!v)continue;
                if(!filter_string)
                {
                    result = result && `${v}`.toLowerCase() === `${value}`.toLowerCase();
                }
                else
                {
                    result = result && `${v}`.toLowerCase().indexOf(`${value}`.toLowerCase())>=0;
                }
            }
            return result;
        });

        const tot=[''];
        for (let iii = 0; iii < fltr.length; iii++) {
            const row = fltr[iii];
            for (let xxx = 0; xxx < fields.length; xxx++) {
                const {type, no_sum, name, field} = fields[xxx];
                if(xxx===0)continue;
                const iv=xxx;
                switch (type) {
                    case 'string':
                        if(!tot[iv])tot[iv]='';
                        break;
                    case 'time':
                        if(!tot[iv])tot[iv]='';
                        break;
                    case 'number':
                        if(!no_sum)
                        {
                            const val=(!!field)?((row[name] && row[name][field]) || 0) : row[name];                            
                            if(!tot[iv])tot[iv]=0;
                            tot[iv]+=val;
                        }
                        else{
                            if(!tot[iv])tot[iv]='';
                        }
                        break;
                    default:
                        if(!tot[iv])tot[iv]='';
                        break;
                }
            }
        }
        return [fltr, ['Total',...tot]];
    },[data, fields, selectedValue]);

    useEffect(()=>{
        const strHeader=[];
        for (let iii = 0; iii < fields.length; iii++) {
            const cell = fields[iii];
            const {type, filter_string, field} = cell;
            if(type!=='string'){
                continue;
            }else if(filter_string){
                strHeader.push({name:header[iii], filter_string, index:iii, filter_data:'', field});
                continue;
            }
            const filter_data = ['ALL'];
            for (let iii = 0; iii < data.length; iii++) {
                const row = data[iii];
                const val = getValue(row, cell)
                if(filter_data.indexOf(val)<0)filter_data.push(val);
            }
            strHeader.push({name:header[iii], filter_string, index:iii, filter_data, field});
        }
        setFilterLists(strHeader);
    }, [header, fields, data]);

    useEffect(()=>{
        onDataChange && typeof onDataChange === 'function' && onDataChange(filteredData);
    }, [filteredData])

    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                <PrintBtn 
                    printHeader={printHeader}
                    printFooter={printFooter}
                    data={filteredData} total={total} headers={header} fields={fields} title={`${repType}_report_${date.split('/').join('_')}`}
                    Icon={<RiPrinterLine color={amber[800]} />} iconBtnProps={{size:'small'}}
                    periode={date.split('/').join('_')} repType={repType}
                />
                <IconButton size={"small"} onClick={()=>{
                        ExportExcel(filteredData, header, fields, repType, date);
                    }} >
                    <RiFileExcel2Line color={green[700]}/>
                </IconButton>
                <IconButton size={"small"} onClick={()=>setRefresh(moment().unix())} >
                    <RiRefreshLine color={blueGrey[800]} />
                </IconButton>
            </div>
            <TableContainer component={Paper} variant='outlined'>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{textAlign:'center'}}>
                                #
                            </TableCell>
                            {
                                header && Array.isArray(header) && header.map((head, idx)=>( <TableCell key={idx}>{head}</TableCell> ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filteredData && Array.isArray(filteredData) && filteredData.map((row, idx)=>(
                                <TableRow key={idx}>
                                    <TableCell style={{textAlign:'center'}}>
                                        {idx+1}
                                    </TableCell>
                                    {                                                                              
                                        fields && Array.isArray(fields) && fields.map((cell, idx2)=>( 
                                            <TableCell key={`${idx}__${idx2}`} style={{textAlign:cell.align || 'center'}}>
                                                {getValue(row, cell)  }
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                        
                        <TableRow>
                            {
                                total && Array.isArray(total) && total.map((cell, idx2)=>( 
                                    <TableCell key={`SUM_${idx2}`} style={{textAlign:'right', fontWeight:'bold'}}>
                                        {typeof cell ==='number' ? numeral(cell).format('0,000'):cell}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableBody>
                    
                </Table>
            </TableContainer>
        </div>
    )
}