/* eslint-disable react-hooks/exhaustive-deps */
import { MenuItem, TextField, Button } from '@material-ui/core';
import React, { useEffect, useState, useMemo } from 'react';
import {RiAddCircleLine} from 'react-icons/ri';

export default ({lists, onFilterValueChange, maxFilter, idReport}) => {
    // const [filterIdx, setFilterIdx]=useState(0);
    const [filterTypeStr, setFilterTypeStr]=useState([]);
    const [qry, setQry]=useState([]);
    const [selectedValue, setSelectedValue]=useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [values, setValues] = useState([]);
    const [filters, setFilters] = useState([]);
    const max = maxFilter || 3;
    const filterNames = useMemo(() => {
        return lists.map(({filter_data, ...rest})  => rest);
    }, [lists])

    const filterData=useMemo(()=>{
        const filter = [];
        for (let iii = 0; iii < selectedValue.length; iii++) {
            const val = selectedValue[iii];
            const [field] = filterNames.filter((v) => `${v.index}` === `${selectedFilters[iii]}`);
            filter.push({...field, value:val});
        }
        return filter;
    }, [selectedValue])

    useEffect(()=>{
        onFilterValueChange && typeof onFilterValueChange==='function' && onFilterValueChange(filterData);
    },[filterData])

    useEffect(()=>{
        setFilters([]);
        setValues([]);
        setSelectedValue([]);
        setQry([]);
        setFilterTypeStr([]);
        setSelectedFilters([]);
    },[idReport])

    const renderFilter=(idx)=>(
        <div style={{display:'flex', flexDirection:'row', marginBlock:10}} key={idx}>
            <TextField
                select
                label="Filter Name"
                value={selectedFilters[idx]}
                size='small'
                variant="outlined"
                style={{width:180, marginInline:5}}
                onChange={(e)=> {                    
                    selectedFilters[idx] = `${e.target.value}`;
                    setSelectedFilters([...selectedFilters])

                    const [sel]=lists.filter(({index})=>index===e.target.value);
                    const {filter_data, filter_string:filter_str} = sel;
                    filterTypeStr[idx]=filter_str;
                    setFilterTypeStr([...filterTypeStr]);
                    qry[idx] = '';
                    setQry([...qry]);

                    if(!filter_str){
                        values[idx] = filter_data;
                        setValues([...values]);
                        selectedValue[idx] = 'ALL'
                        setSelectedValue([...selectedValue]);
                    }
                    else
                    {
                        selectedValue[idx] = '';
                        setSelectedValue([...selectedValue]);
                    }
                }}
            >
                {
                    filterNames.map(({name, index}, i)=> {
                        const otherIdx = selectedFilters.filter((v, i) => `${v}`!==`${selectedFilters[idx]}`);
                        const oke = otherIdx.indexOf(`${index}`) < 0;
                        return oke && <MenuItem key={`FITLER_NAME_${idx}__${i}`} value={index}>{name}</MenuItem>
                    }).filter(x => x)
                }
            </TextField>
            {
                (filterTypeStr[idx] && (
                    <TextField
                        label="Filter Value"
                        value={qry[idx]}
                        size='small'
                        variant="outlined"
                        style={{width:180, marginInline:5}}
                        onChange={(e)=> {
                            qry[idx] = e.target.value;
                            setQry([...qry])
                        }}
                        onKeyDown={e=>{
                            if(e.key==='Enter'){
                                selectedValue[idx] = qry[idx];
                                setSelectedValue([...selectedValue]);
                            }
                        } }
                    />
                )) || (
                    <TextField
                        select
                        label="Filter Value"
                        value={selectedValue[idx]}
                        size='small'
                        variant="outlined"
                        style={{width:220, marginInline:5}}
                        onChange={(e)=>{
                            selectedValue[idx]=e.target.value;
                            setSelectedValue([...selectedValue]);
                        }}
                    >
                        {
                            !!values[idx] && Array.isArray(values[idx]) && values[idx].map((v, ix)=> <MenuItem key={`FILTER_VALUE_${idx}__${ix}`} value={v}>{v===''?'Empty String':v}</MenuItem>)
                        }
                    </TextField>
                )
            }
        </div>
    )

    useEffect(() => {
        if(lists.length>0){
            for (let iii = 0; iii < selectedFilters.length; iii++) {
                const idx = selectedFilters[iii];
                const [list] = lists.filter(({index}) => `${index}`===`${idx}`);
                if(!!list){
                    const {filter_data} = list;
                    values[iii] = filter_data;
                    setValues([...values]);
                }
            }
        }
    }, [lists]);

    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            {
                filters.map((f, idx) => renderFilter(idx))
            }
            {
                max > filters.length && (
                    <Button 
                        startIcon={<RiAddCircleLine />} 
                        variant='outlined' 
                        color="secondary" 
                        style={{width:240}}
                        disabled={!!lists && Array.isArray(lists) && filters.length>=lists.length}
                        onClick={()=>{
                            setFilters([...filters, true]);
                            const [first] = lists.filter(({index}) => selectedFilters.indexOf(`${index}`)<0);
                            const {filter_string, filter_data} = first;
                            setSelectedFilters([...selectedFilters, `${first.index}`]);
                            setFilterTypeStr([...filterTypeStr, filter_string]);
                            setQry([...qry, '']);
                            setSelectedValue([...selectedValue, filter_string?'':'ALL']);
                            setValues([...values, filter_string?[]:filter_data])
                        }}
                    >
                        Add New Filter
                    </Button>
                )
            }
        </div>
    )
}