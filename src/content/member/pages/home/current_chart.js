import { Box, Typography } from '@material-ui/core';
import {  green, red } from '@material-ui/core/colors';
import React, { useMemo } from 'react';
import {BarChart, ResponsiveContainer, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import filesize from 'filesize';
import numeral from 'numeral';

export default ({data, loading})=>{
    const chartData=useMemo(()=>{
        if(loading)return [];
        if(!data)return [];
        const {chart_data}=data;
        // const cData=all?makeDailyChartAdminData(send, receive):makeDailyChartStateData(send, receive);
        return chart_data;
    }, [data, loading]);

    return chartData.length>0 && chartData.map((cData, idx)=>{
        return (
            <Box p={3} key={idx}>
                <Typography>{ cData.title } - Outgoing Messages per Day</Typography>
                <ResponsiveContainer width='90%' height={480}>
                    <BarChart
                        width={'100%'}
                        height={480}
                        data={cData.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="telexAddress"/>
                        <YAxis yAxisId="message" orientation="left" tickFormatter={tick=>numeral(tick).format('0 a')} />
                        <YAxis yAxisId="char" orientation="right" tickFormatter={tick=>filesize(tick)} />
                        <Tooltip formatter={(val)=>numeral(val).format('0,000')} />
                        <Bar yAxisId="message" dataKey="msg_out" name="Msg Sent" fill={green[400]}>
                            {
                                cData.data.map((entry, idx)=>{
                                    return <Cell key={idx} fill={entry.telexAddress==='TypeB'?red[400]:green[400]} />
                                })
                            }
                        </Bar>
                        <Bar yAxisId="char" dataKey="send" name="Char Sent" fill={green[700]}>
                            {
                                cData.data.map((entry, idx)=>{
                                    return <Cell key={idx} fill={entry.telexAddress==='TypeB'?red[700]:green[700]} />
                                })
                            }
                        </Bar>                       
                    </BarChart>
                    
                </ResponsiveContainer>  

                <Box p={3}></Box>
                <Typography>{ cData.title } - Incoming Messages per Day</Typography>
                <ResponsiveContainer width='90%' height={480}>
                    <BarChart
                        width={'100%'}
                        height={480}
                        data={cData.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="telexAddress"/>
                        <YAxis yAxisId="message" orientation="left" tickFormatter={tick=>numeral(tick).format('0 a')} />
                        <YAxis yAxisId="char" orientation="right" tickFormatter={tick=>filesize(tick)} />
                        <Tooltip formatter={(val)=>numeral(val).format('0,000')} />
                        <Bar yAxisId="message" dataKey="msg_in" name="Msg Received" fill={green[400]}>
                            {
                                cData.data.map((entry, idx)=>{
                                    return <Cell key={idx} fill={entry.telexAddress==='TypeB'?red[400]:green[400]} />
                                })
                            }
                        </Bar>
                        <Bar yAxisId="char" dataKey="receive" name="Char Received" fill={green[700]}>
                            {
                                cData.data.map((entry, idx)=>{
                                    return <Cell key={idx} fill={entry.telexAddress==='TypeB'?red[700]:green[700]} />
                                })
                            }
                        </Bar>
                    </BarChart>
                    
                </ResponsiveContainer>               
            </Box>
        )
    })
}