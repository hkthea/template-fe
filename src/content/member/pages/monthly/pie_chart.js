import { blue, green } from '@material-ui/core/colors';
import React from 'react';
import {ResponsiveContainer, PieChart, Tooltip, Pie, Cell, Legend} from 'recharts';
import filesize from 'filesize';
import { Typography } from '@material-ui/core';
import numeral from 'numeral';

export default ({MessageCount, CharCount, TelexAddress})=>{
    const RADIAN = Math.PI / 180;
    const renderCharsLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {                
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={18}>
                {filesize(value)}
            </text>
        )
    };
    const renderMsgsLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {                
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central"  fontSize={18}>
                {numeral(value).format('0,000')}
            </text>
        )
    };

    return (
        <React.Fragment>
            <Typography variant="body1" align="left">{TelexAddress}</Typography>
            <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
                <div style={{width:'45%', minWidth:320, display:'flex', flexDirection:'column'}}>
                    <Typography align="center" style={{marginLeft:'auto', marginRight:'auto'}} variant="h6">Total Messages</Typography>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart width={200} height={300}>
                            <Tooltip formatter={(val)=>numeral(val).format('0,000')}/>
                            <Legend />                
                            <Pie data={MessageCount} dataKey={'value'} cx={"50%"} cy={"50%"} outerRadius={150} label={renderMsgsLabel} labelLine={false}>
                                {
                                    MessageCount && MessageCount.map((msg, idx)=>(
                                        <Cell key={idx} fill={msg.name==='Sent'?green[500]:blue[500]} />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{width:'45%', minWidth:320, display:'flex', flexDirection:'column'}}>
                    <Typography align="center" style={{marginLeft:'auto', marginRight:'auto'}} variant="h6">Total Characters</Typography>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart width={200} height={300}>
                            <Tooltip formatter={(val)=>numeral(val).format('0,000')}/>
                            <Legend />
                            <Pie data={CharCount} dataKey={'value'} cx={"50%"} cy={"50%"} outerRadius={150} label={renderCharsLabel} labelLine={false}>
                                {
                                    CharCount && CharCount.map((msg, idx)=>(
                                        <Cell key={idx} fill={msg.name==='Sent'?green[800]:blue[800]} />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </React.Fragment>
    )

}