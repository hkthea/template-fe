import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import numeral from 'numeral';
import React, { useMemo } from 'react';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      borderRight:'1px solid #fdfdfd'
    },
    body: {
      fontSize: 14,
    },
    footer:{
      fontSize:16,
      fontWeight:'bold'  
    }
}))(TableCell);


export default ({data, loading, title, tableType})=>{
    const [total1, total2]=useMemo(()=>{
        if(data && Array.isArray(data) && data.length>0)
        {
            return data.reduce((acc, val)=>{
                const [tot1, tot2]=acc;
                return [tot1+parseInt(val.message_count), tot2+parseInt(val.char_count)];
            },[0, 0]);
        }
        return [0, 0]
    },[data])
    return (
        <TableContainer style={{marginTop:15, padding:10}} component={Paper} >
            <Typography variant={"caption"}>{title}</Typography>
            <Table size="small" >
                <TableHead>
                    <TableRow style={{border:"1px solid black"}}>
                        <StyledTableCell component="th" colSpan={3}>Origin</StyledTableCell>
                        <StyledTableCell component="th" colSpan={tableType==='Email'?2:3}>Destination</StyledTableCell>
                        <StyledTableCell component="th" colSpan={2}>Server Name</StyledTableCell>
                        <StyledTableCell component="th" rowSpan={2}>Priority</StyledTableCell>
                        <StyledTableCell component="th" colSpan={2}>Total</StyledTableCell>
                    </TableRow>
                    <TableRow style={{border:"1px solid black"}}>
                        <StyledTableCell component="th">City</StyledTableCell>
                        <StyledTableCell component="th">Code</StyledTableCell>
                        <StyledTableCell component="th">Address</StyledTableCell>
                        {
                            tableType!=='Email' && <StyledTableCell component="th">City</StyledTableCell>
                        }
                        <StyledTableCell component="th">{tableType==='Email'?'Domain':'Code'}</StyledTableCell>
                        <StyledTableCell component="th">Address</StyledTableCell>
                        <StyledTableCell component="th">From</StyledTableCell>
                        <StyledTableCell component="th">To</StyledTableCell>
                        <StyledTableCell component="th">Message</StyledTableCell>
                        <StyledTableCell component="th">Character</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (
                            data && Array.isArray(data) && data.length>0 && data.map((row, idx)=>(
                                <TableRow key={idx}>
                                    <TableCell> {row?.oriCity} </TableCell>
                                    <TableCell> {row?.oriCode} </TableCell>
                                    <TableCell> {row?.origin} </TableCell>
                                    {tableType!=='Email' && <TableCell> {row?.desCity} </TableCell>}
                                    <TableCell> {row?.desCode} </TableCell>
                                    <TableCell> {row?.dest} </TableCell>
                                    <TableCell> {row?.from_server} </TableCell>
                                    <TableCell> {row?.to_server} </TableCell>
                                    <TableCell> {row?.priority && (row.priority.toLowerCase()==='unknown' ? '':row.priority)} </TableCell>
                                    <TableCell style={{textAlign:'right'}}> {numeral(row?.message_count).format('0,000')} </TableCell>                                    
                                    <TableCell style={{textAlign:'right'}}> {numeral(row?.char_count).format('0,000')} </TableCell>
                                </TableRow>
                            ))
                        ) || (
                            <TableRow>
                                <TableCell colSpan={tableType==='Email'?10:11} style={{textAlign:'center'}}>Data Not Found</TableCell>
                            </TableRow>
                        )                            
                    }
                </TableBody>
                <TableFooter>
                    <TableRow style={{border:"1px solid black"}}>
                        <StyledTableCell colSpan={tableType==='Email'?8:9}>Total</StyledTableCell>
                        <StyledTableCell style={{textAlign:'right'}}>{numeral(total1).format('0,000')}</StyledTableCell>
                        <StyledTableCell style={{textAlign:'right'}}>{numeral(total2).format('0,000')}</StyledTableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}