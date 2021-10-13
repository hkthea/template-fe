import { Box, Paper, Typography } from '@material-ui/core';
import {  blueGrey, green, red } from '@material-ui/core/colors';
import React, { useMemo } from 'react';
import {BarChart, ResponsiveContainer, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend } from 'recharts';
import filesize from 'filesize';
import numeral from 'numeral';

export default ({data, loading})=>{
    const chartData=useMemo(()=>{
        if(loading)return [];
        if(!data)return [];
        const {chart_data}=data;
        
        return chart_data || [];
    }, [data, loading]);

    return chartData.length>0 && chartData.map((cData, idx)=>{
        return (
            <React.Fragment key={idx}>
                <Paper>
                    <Box p={4}>
                        <Typography>{ cData.title } - Messages Sent per Month</Typography>
                        <ResponsiveContainer width='90%' height={480}>
                            <BarChart
                                width={'100%'}
                                height={480}
                                data={cData.data.addr}
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
                                        cData.data.addr.map((entry, idx)=>{
                                            return <Cell key={idx} stroke={entry.telexAddress==='TypeB'?red[400]:green[400]} fill={entry.telexAddress==='TypeB'?red[400]:green[400]} />
                                        })
                                    }
                                </Bar>
                                <Bar yAxisId="char" dataKey="send" name="Char Sent" fill={green[700]}>
                                    {
                                        cData.data.addr.map((entry, idx)=>{
                                            return <Cell key={idx} stroke={entry.telexAddress==='TypeB'?red[700]:green[700]} fill={entry.telexAddress==='TypeB'?red[700]:green[700]} />
                                        })
                                    }
                                </Bar>                       
                            </BarChart>                    
                        </ResponsiveContainer>  
                        <Box p={3}></Box>
                        <Typography>{ cData.title } - Messages Received per Month</Typography>
                        <ResponsiveContainer width='90%' height={480}>
                            <BarChart
                                width={'100%'}
                                height={480}
                                data={cData.data.addr}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="telexAddress"/>
                                <YAxis yAxisId="message" orientation="left"  tickFormatter={tick=>numeral(tick).format('0 a')} />
                                <YAxis yAxisId="char" orientation="right" tickFormatter={tick=>filesize(tick)} />
                                <Tooltip formatter={(val)=>numeral(val).format('0,000')} />
                                <Bar yAxisId="message" dataKey="msg_in" name="Msg Received" fill={green[400]}>
                                    {
                                        cData.data.addr.map((entry, idx)=>{
                                            return <Cell key={idx} fill={entry.telexAddress==='TypeB'?red[400]:green[400]} />
                                        })
                                    }
                                </Bar>
                                <Bar yAxisId="char" dataKey="receive" name="Char Received" fill={green[700]}>
                                    {
                                        cData.data.addr.map((entry, idx)=>{
                                            return <Cell key={idx} fill={entry.telexAddress==='TypeB'?red[700]:green[700]} />
                                        })
                                    }
                                </Bar>
                            </BarChart>
                            
                        </ResponsiveContainer>   
                    </Box>
                </Paper>
                <Box p={3}></Box>               
                <Paper>
                    <Box p={4}>
                        <Typography>{ cData.title } - Total Messages Sent per Month by Day</Typography>
                        <ResponsiveContainer  width='90%' height={480}>
                            <LineChart
                                width={'100%'}
                                height={400}
                                data={cData.data.periode}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date"/>
                                <Legend />
                                <YAxis yAxisId="message" scale="sqrt" orientation="left" tickFormatter={tick=>numeral(tick).format('0 a')}/>
                                <Tooltip formatter={(val)=>numeral(val).format('0,000')} />
                                <Line type="monotone" yAxisId="message" dataKey="msg_edifly" name="EDIfly" fill={green[700]} stroke={green[700]} />
                                <Line type="monotone" yAxisId="message" dataKey="msg_typeb" name="TypeB" fill={red[700]} stroke={red[700]} />
                                <Line type="monotone" yAxisId="message" dataKey="msg_email" name="Email" fill={blueGrey[700]} stroke={blueGrey[700]} />                        
                            </LineChart>
                            
                        </ResponsiveContainer>
                        <Box p={3}></Box>               
                        <Typography>{ cData.title } - Total Chars Sent per Month by Day</Typography>
                        <ResponsiveContainer  width='90%' height={480}>
                            <LineChart
                                width={'100%'}
                                height={400}
                                data={cData.data.periode}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date"/>
                                <Legend />
                                <YAxis yAxisId="message" scale="sqrt" orientation="left" tickFormatter={tick=>filesize(tick)}/>
                                <Tooltip formatter={(val)=>numeral(val).format('0,000')} />
                                <Line type="monotone" yAxisId="message" dataKey="char_edifly" name="EDIfly" fill={green[700]} stroke={green[700]} />
                                <Line type="monotone" yAxisId="message" dataKey="char_typeb" name="TypeB" fill={red[700]} stroke={red[700]} />
                                <Line type="monotone" yAxisId="message" dataKey="char_email" name="Email" fill={blueGrey[700]} stroke={blueGrey[700]} />                        
                            </LineChart>
                            
                        </ResponsiveContainer>
                    </Box>
                </Paper>
                <Box p={3}></Box> 
                <Paper>
                    <Box p={4}>
                        <Typography>{ cData.title } - Total Messages Received per Month by Day</Typography>
                        <ResponsiveContainer  width='90%' height={480}>
                            <LineChart
                                width={'100%'}
                                height={400}
                                data={cData.data.periode}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date"/>
                                <Legend/>
                                <YAxis yAxisId="message" scale="sqrt" orientation="left" tickFormatter={tick=>numeral(tick).format('0 a')} />
                                <Tooltip formatter={(val)=>numeral(val).format('0,000')} />
                                <Line type="monotone" yAxisId="message" dataKey="rcv_msg_edifly" name="EDIfly" fill={green[700]} stroke={green[700]} />
                                <Line type="monotone" yAxisId="message" dataKey="rcv_msg_typeb" name="TypeB" fill={red[700]} stroke={red[700]} />
                                <Line type="monotone" yAxisId="message" dataKey="rcv_msg_email" name="Email" fill={blueGrey[700]} stroke={blueGrey[700]} />                        
                            </LineChart>
                            
                        </ResponsiveContainer>
                        <Box p={3}></Box>               
                        <Typography>{ cData.title } - Total Chars Received per Month by Day</Typography>
                        <ResponsiveContainer  width='90%' height={480}>
                            <LineChart
                                width={'100%'}
                                height={400}
                                data={cData.data.periode}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date"/>
                                <Legend/>
                                <YAxis yAxisId="message" scale="sqrt" orientation="left" tickFormatter={tick=>filesize(tick)} />
                                <Tooltip formatter={(val)=>numeral(val).format('0,000')} />
                                <Line type="monotone" yAxisId="message" dataKey="rcv_char_edifly" name="EDIfly" fill={green[700]} stroke={green[700]} />
                                <Line type="monotone" yAxisId="message" dataKey="rcv_char_typeb" name="TypeB" fill={red[700]} stroke={red[700]} />
                                <Line type="monotone" yAxisId="message" dataKey="rcv_char_email" name="Email" fill={blueGrey[700]} stroke={blueGrey[700]} />                        
                            </LineChart>
                            
                        </ResponsiveContainer>
                    </Box>
                </Paper>              
            </React.Fragment>
        )
    })
}