import {  IconButton, Typography } from '@material-ui/core';
import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useRef, useState } from 'react';
import RctToPrint from 'react-to-print';
import './print_content.css';
class PrintContent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:props.data,
            header:props.header,
            fields:props.fields,
            repType:props.repType,
            periode:props.periode,
            total:props.total,
            rowPerPage:props.rowPerPage,
            printHeader:props.printHeader,
            printFooter:props.printFooter
        };
    }

    getValue(row, cell){
        const {type, name, field, format}=cell;
        const val = (!!field)?(row[name] && row[name][field]) || '-' : row[name];
        switch (type) {
            case 'string':
                return val;
            case 'time':
                return !!val? moment(val).format(format):'';
            case 'number':
                return numeral(val).format('0,000');
            default:
                return val;
        }
    }

    getClassName(cell){
        const {type}=cell;
        return type==='number'?'data-number':'';
    }

    calcPages(data){
        return Math.ceil(data.length / this.state.rowPerPage);
    }

    getPagesData(data){
        const totalPage = this.calcPages(data);
        console.log({totalPage, data});
        const pages = [];
        for (let iii = 0; iii < totalPage; iii++) {
            const start = iii * this.state.rowPerPage;
            const last =  (iii+1) * this.state.rowPerPage;
            const datas = data.slice(start, last);
            // console.log({start, last, datas});
            pages.push({pageNum:iii+1, totalPage, rows:datas});
        }
        return pages;
    }

    renderPages(){
        // const {data} = this.state;
        const {header, fields, repType, data, periode, total, printHeader, printFooter}=this.state;
        // const pages = this.getPagesData(data);
        return (
            <div>
                    {
                        printHeader || (
                                <div className="page-header">   
                                    <Typography variant="h6" style={{textTransform:'capitalize', textAlign:'center'}}>{repType} Report</Typography>
                                    <Typography variant="body1" style={{textTransform:'capitalize', textAlign:'center'}}>{periode}</Typography>
                                </div>      
                        )
                    }
                    <table className='report-table' cellPadding={0} cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>#</th>
                                {
                                    header.map((head, i) => <th key={i}>{head}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, i) => (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        {
                                            fields.map((cell, j) => (
                                                <td key={`${i}__${j}`} className={this.getClassName(cell)}>
                                                    {this.getValue(row, cell)}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                            <tr>
                                {
                                    total && Array.isArray(total) && total.map((cell, idx2)=>( 
                                        <td key={`SUM_${idx2}`} style={{textAlign:'right', fontWeight:'bold'}}>
                                            {typeof cell ==='number' ? numeral(cell).format('0,000'):cell}
                                        </td>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table> 
                    <div className='page-break'>
                        {
                            printFooter 
                        }
                    </div>
            </div>
        )        
    }

    render(){        
        return this.renderPages();        
    }
}

const pageStyle=``;

export default ({data, headers, fields, Icon, iconBtnProps, title, repType, periode, total, printHeader, printFooter})=>{
    const theRef=useRef();
    // const classes2=useStyles2();
    const [reRender, setRerender]=useState(true);
    useEffect(()=>{
        setRerender(false);
        setTimeout(()=>{
            setRerender(true);
        }, 500);
    },[data])
    return (
        <React.Fragment>
            <RctToPrint 
                trigger={()=>(
                    <IconButton size="small" {...iconBtnProps}>
                        {Icon}
                    </IconButton>
                )}
                documentTitle={`${title}`}
                content={()=>theRef.current}
                pageStyle={pageStyle}
            />
            <div style={{display:'none'}}>
                { 
                    reRender && <PrintContent data={data} total={total} rowPerPage={20}
                        repType={repType} ref={theRef} header={headers} periode={periode}
                        fields={fields} printHeader={printHeader} printFooter={printFooter} /> 
                }
            </div>
        </React.Fragment>
    )
}