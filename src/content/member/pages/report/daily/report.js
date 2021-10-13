import { blue, green,  red } from '@material-ui/core/colors';
import ExcelJS from 'exceljs';
import {saveAs} from 'file-saver';

const createReport=(data, idx)=>{    
    return data[idx] || [];
}

const createReportMonthly=(data, idx)=>{    
    if(!data)return [];
    const result=[];    
    for (const key in data[idx]) {
        if (Object.hasOwnProperty.call(data[idx], key)) {
            const row = data[idx][key];
            result.push(row);
        }
    }
    return result;
}

const parseReport=(aData, isSend=false)=>{
    const data={};
    for (let iii = 0; iii < aData.length; iii++) {
        const row = aData[iii];
        const { from_server, to_server, origin, dest }=row;
        const sName=isSend?to_server:from_server;
        const idx=sName.toLowerCase()==='external'?'TypeB':(sName.toLowerCase()==='email'?'Email':'EDIfly');
        if(!data[`${idx}`])data[`${idx}`]=[];
        if(idx!=='Email')
        {
            const oriCity=`${origin}`.substr(0, 3);
            const oriCode=`${origin}`.substr(-2);
            const desCity=`${dest}`.substr(0, 3);
            const desCode=`${dest}`.substr(-2);
            data[`${idx}`].push( {...row, oriCity, oriCode, desCity, desCode } );
        }
        else
        {
            const oriCity=`${origin}`.substr(0, 3);
            const oriCode=`${origin}`.substr(-2);
            const [desCity, desCode]=dest.split('@');
            data[`${idx}`].push( {...row, oriCity, oriCode, desCity, desCode } );
        }
    }
    return data;
}

const parseReportMonthly=(aData, isSend=false)=>{
    const data={};
    for (let iii = 0; iii < aData.length; iii++) {
        const row = aData[iii];
        const { from_server, to_server, origin, dest, priority, message_count, char_count }=row;
        const sName=isSend?to_server:from_server;
        const taddr=`${origin}${dest}${priority}`;
        const idx=sName.toLowerCase()==='external'?'TypeB':(sName.toLowerCase()==='email'?'Email':'EDIfly');
        let oriCity='';
        let oriCode='';
        let desCity='';
        let desCode='';
        if(idx!=='Email')
        {            
            desCity=`${dest}`.substr(0, 3);
            desCode=`${dest}`.substr(-2);
        }
        else
        {
            const [dci, dcd]=dest.split('@');
            desCity=dci;
            desCode=dcd;
        }
        oriCity=`${origin}`.substr(0, 3);
        oriCode=`${origin}`.substr(-2);

        if(!data[`${idx}`])data[`${idx}`]={};
        if(!data[`${idx}`][`${taddr}`]){
            data[`${idx}`][`${taddr}`]={...row, oriCity, oriCode, desCity, desCode};
        }
        else
        {
            data[`${idx}`][`${taddr}`].message_count+=message_count;
            data[`${idx}`][`${taddr}`].char_count+=char_count;
        }        
    }

    return data;
}

export const compileReport=(send, receive, all)=>{
    const dataOut=parseReport(send, true);
    const dataIn=parseReport(receive, false);
    
    const outEdifly=createReport(dataOut, 'EDIfly');
    const outTypeB=createReport(dataOut, 'TypeB');
    const outEmail=createReport(dataOut, 'Email');

    const incEdifly=createReport(dataIn, 'EDIfly');
    const incTypeB=createReport(dataIn, 'TypeB');
    const incEmail=createReport(dataIn, 'Email');
    return [outEdifly, outTypeB, outEmail, incEdifly, incTypeB, incEmail];
}

export const compileMonthlyReport=(send, receive, all)=>{
    const dataOut=parseReportMonthly(send, true);
    const dataIn=parseReportMonthly(receive, false);

    const outEdifly=createReportMonthly(dataOut, 'EDIfly');
    const outTypeB=createReportMonthly(dataOut, 'TypeB');
    const outEmail=createReportMonthly(dataOut, 'Email');

    const incEdifly=createReportMonthly(dataIn, 'EDIfly');
    const incTypeB=createReportMonthly(dataIn, 'TypeB');
    const incEmail=createReportMonthly(dataIn, 'Email');
    return [outEdifly, outTypeB, outEmail, incEdifly, incTypeB, incEmail];
}

const formatCell=(cell, value, format="", bold=false, align={horizontal:'center', vertical:'middle'} )=>{
    if(format!=='')cell.numFmt=format;
    if(bold)cell.font={bold:true};
    cell.alignment=align;
    cell.value=value;
    cell.border={bottom:{style:'thin'}, top:{style:'thin'}, left:{style:'thin'}, right:{style:'thin'}};
}

const createHeaderInfo=(sheet, idx, title)=>{
    sheet.mergeCells(`A${idx}:C${idx}`);
    sheet.mergeCells(`D${idx}:F${idx}`);
    sheet.mergeCells(`G${idx}:H${idx}`);
    sheet.mergeCells(`I${idx}:I${idx+1}`);
    sheet.mergeCells(`J${idx}:K${idx}`);
    
    formatCell(sheet.getCell(`A${idx}`), 'Origin', '', true);
    formatCell(sheet.getCell(`D${idx}`), 'Destination', '', true);
    formatCell(sheet.getCell(`G${idx}`), 'Server', '', true);
    formatCell(sheet.getCell(`I${idx}`), 'Priority', '', true);
    formatCell(sheet.getCell(`J${idx}`), 'Total', '', true);
    formatCell(sheet.getCell(`A${idx+1}`), 'City', '', true);
    formatCell(sheet.getCell(`B${idx+1}`), 'Code', '', true);
    formatCell(sheet.getCell(`C${idx+1}`), 'Address', '', true);
    formatCell(sheet.getCell(`D${idx+1}`), title==='Email'?'Username':'City', '', true);
    formatCell(sheet.getCell(`E${idx+1}`), title==='Email'?'Domain':'Code', '', true);
    formatCell(sheet.getCell(`F${idx+1}`), 'Address', '', true);
    formatCell(sheet.getCell(`G${idx+1}`), 'From', '', true);
    formatCell(sheet.getCell(`H${idx+1}`), 'To', '', true);
    formatCell(sheet.getCell(`J${idx+1}`), 'Message', '', true);
    formatCell(sheet.getCell(`K${idx+1}`), 'Character', '', true);
    
}

const createHeaderSummaryInfo=(sheet, idx, title)=>{
    sheet.mergeCells(`M${idx}:M${idx+1}`);
    sheet.mergeCells(`N${idx}:O${idx}`);
    sheet.mergeCells(`P${idx}:Q${idx}`);
    sheet.mergeCells(`R${idx}:S${idx}`);
    
    formatCell(sheet.getCell(`M${idx}`), title, '', true);
    formatCell(sheet.getCell(`N${idx}`), 'Messages', '', true);
    formatCell(sheet.getCell(`P${idx}`), 'Character', '', true);
    formatCell(sheet.getCell(`R${idx}`), 'Total', '', true);
    formatCell(sheet.getCell(`N${idx+1}`), 'Sent', '', true);
    formatCell(sheet.getCell(`O${idx+1}`), 'Received', '', true);
    formatCell(sheet.getCell(`P${idx+1}`), 'Sent', '', true);
    formatCell(sheet.getCell(`Q${idx+1}`), 'Received', '', true);
    
    formatCell(sheet.getCell(`R${idx+1}`), 'Messages', '', true);
    formatCell(sheet.getCell(`S${idx+1}`), 'Characters', '', true);    
}

const createTableSheet=(sheet, data, title, isSend, lastIdx=0)=>{
    sheet.mergeCells(`A${lastIdx}:E${lastIdx}`);
    let cell=sheet.getCell(`A${lastIdx}`);
    cell.value=`Report ${isSend?'Outgoing':'Incoming'} Traffic ${title}`;
    createHeaderInfo(sheet, lastIdx+1, title);
    let idx=lastIdx+3;
    const start=idx;
    let end=idx;
    for (let iii = 0; iii < data.length; iii++) {
        const row = data[iii];
        const {oriCity, oriCode, origin, desCity, desCode, dest, message_count, char_count, from_server, to_server, priority }=row;        
        const pr=priority.toLowerCase()==='unknown'?'':priority;
        formatCell(sheet.getCell(`A${idx}`), oriCity);
        formatCell(sheet.getCell(`B${idx}`), oriCode);
        formatCell(sheet.getCell(`C${idx}`), origin);
        formatCell(sheet.getCell(`D${idx}`), desCity);
        formatCell(sheet.getCell(`E${idx}`), desCode);
        formatCell(sheet.getCell(`F${idx}`), dest);
        formatCell(sheet.getCell(`G${idx}`), from_server);
        formatCell(sheet.getCell(`H${idx}`), to_server);
        formatCell(sheet.getCell(`I${idx}`), pr);
        formatCell(sheet.getCell(`J${idx}`), message_count, '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`K${idx}`), char_count, '#,##0',false, {horizontal:'right'});
        end=idx;
        idx++;
    }
    sheet.mergeCells(`A${idx}:I${idx}`);
    formatCell(sheet.getCell(`A${idx}`), 'Total', '', true, {horizontal:'left'});
    if(data.length>0)
    {
        formatCell(sheet.getCell(`J${idx}`), {formula:`=SUM(J${start}:J${end})`}, '#,##0', true, {horizontal:'right'});
        formatCell(sheet.getCell(`K${idx}`), {formula:`=SUM(K${start}:K${end})`}, '#,##0', true, {horizontal:'right'});
    }
    else
    {
        formatCell(sheet.getCell(`J${idx}`), {formula:`=0`}, '#,##0', true, {horizontal:'right'});
        formatCell(sheet.getCell(`K${idx}`), {formula:`=0`}, '#,##0', true, {horizontal:'right'});
    }
    return idx+1;
}

const createTableSummarySheet=(sheet, summary, title, lastIdx=0)=>{
    const {citySummary, codeSummary}=summary;
    sheet.mergeCells(`M${lastIdx}:S${lastIdx}`);
    let cell=sheet.getCell(`M${lastIdx}`);
    cell.value=`Report Summary Usage Traffic ${title} By Code`;
    createHeaderSummaryInfo(sheet, lastIdx+1, title==='Email'?'Domain':'Code');
    let idx=lastIdx+3;
    let start=idx;
    let end=idx;
    for (let iii = 0; iii < codeSummary.length; iii++) {
        const {name, received, sent} = codeSummary[iii];
        formatCell(sheet.getCell(`M${idx}`), name);
        formatCell(sheet.getCell(`N${idx}`), sent?.msg || 0, '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`O${idx}`), received?.msg || 0, '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`P${idx}`), sent?.char || 0, '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`Q${idx}`), received?.char || 0, '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`R${idx}`), parseInt(sent?.msg||0) + parseInt(received?.msg || 0), '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`S${idx}`), parseInt(sent?.char||0) + parseInt(received?.char || 0), '#,##0',false, {horizontal:'right'});
        end=idx;
        idx++;                
    }
    if(codeSummary.length>0)
    {
        formatCell(sheet.getCell(`M${idx}`), 'Total', '', true);
        formatCell(sheet.getCell(`N${idx}`), {formula:`=SUM(N${start}:N${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`O${idx}`), {formula:`=SUM(O${start}:O${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`P${idx}`), {formula:`=SUM(P${start}:P${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`Q${idx}`), {formula:`=SUM(Q${start}:Q${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`R${idx}`), {formula:`=SUM(R${start}:R${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`S${idx}`), {formula:`=SUM(S${start}:S${end})`}, '#,##0',true, {horizontal:'right'});
    }
    if(title==='Email')return true;
    idx+=3;
    sheet.mergeCells(`M${idx}:S${idx}`);
    sheet.getCell(`M${idx}`).value=`Report Summary Usage Traffic ${title} By City`;    
    idx++;
    createHeaderSummaryInfo(sheet, idx, 'City');
    idx+=2;
    start=idx;
    end=idx;
    for (let iii = 0; iii < citySummary.length; iii++) {
        const {name, received, sent} = citySummary[iii];
        formatCell(sheet.getCell(`M${idx}`), name);
        formatCell(sheet.getCell(`N${idx}`), sent?.msg || 0, '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`O${idx}`), received?.msg || 0, '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`P${idx}`), sent?.char || 0, '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`Q${idx}`), received?.char || 0, '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`R${idx}`), parseInt(sent?.msg||0) + parseInt(received?.msg || 0), '#,##0',false, {horizontal:'right'});
        formatCell(sheet.getCell(`S${idx}`), parseInt(sent?.char||0) + parseInt(received?.char || 0), '#,##0',false, {horizontal:'right'});
        end=idx;
        idx++;                
    }
    if(citySummary.length>0)
    {
        formatCell(sheet.getCell(`M${idx}`), 'Total', '', true);
        formatCell(sheet.getCell(`N${idx}`), {formula:`=SUM(N${start}:N${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`O${idx}`), {formula:`=SUM(O${start}:O${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`P${idx}`), {formula:`=SUM(P${start}:P${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`Q${idx}`), {formula:`=SUM(Q${start}:Q${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`R${idx}`), {formula:`=SUM(R${start}:R${end})`}, '#,##0',true, {horizontal:'right'});
        formatCell(sheet.getCell(`S${idx}`), {formula:`=SUM(S${start}:S${end})`}, '#,##0',true, {horizontal:'right'});
    }
    idx++;
}

const createSummary=(cityBased, codeBased, reports, title, isSend)=>{
    for (let iii = 0; iii < reports.length; iii++) {
        const {oriCity, oriCode, desCity, desCode, message_count, char_count} = reports[iii];
        const city=isSend?desCity:oriCity;
        const code=isSend?desCode:oriCode;
        if(!codeBased[`${code}`]){
            codeBased[`${code}`]={received:{msg:0, char:0}, sent:{msg:0, char:0}};
        }
        
        if(isSend)
        {
            codeBased[`${code}`].sent.msg+=message_count;
            codeBased[`${code}`].sent.char+=char_count;            
        }
        else
        {
            codeBased[`${code}`].received.msg+=message_count;
            codeBased[`${code}`].received.char+=char_count;            
        }
        if(title==='Email')continue;
        if(!cityBased[`${city}`]){
            cityBased[`${city}`]={received:{msg:0, char:0}, sent:{msg:0, char:0}};
        }

        if(isSend)
        {
            cityBased[`${city}`].sent.msg+=message_count;
            cityBased[`${city}`].sent.char+=char_count;            
        }
        else
        {
            cityBased[`${city}`].received.msg+=message_count;
            cityBased[`${city}`].received.char+=char_count;            
        }
    }
}

const createSummaries=(incoming, outgoing, title)=>{
    const cityBased={};
    const codeBased={};
    
    createSummary(cityBased, codeBased, incoming, title, false);
    createSummary(cityBased, codeBased, outgoing, title, true);

    const citySummary=[];
    const codeSummary=[];
    for (const key in cityBased) {
        if (Object.hasOwnProperty.call(cityBased, key)) {
            const cty = cityBased[key];
            citySummary.push({...cty, name:key});
        }
    }

    for (const k in codeBased) {
        if (Object.hasOwnProperty.call(codeBased, k)) {
            const cde = codeBased[k];
            codeSummary.push({...cde, name:k});
        }
    }

    return {citySummary, codeSummary};
}

const resizeColumns=(sheet1)=>{
    const colWidth=[4,4,10,4,4,10,10,10,5,10,10,2,4,10,10,10,10,10,10,4,4,4,4];
    for (let i = 0; i <sheet1.columns.length; i += 1) { 
        const column = sheet1.columns[i];
        if(!column)continue;
        column.width=colWidth[i] + 2;
      }
}

const compileRows=(sheet, incoming, outgoing, title, date, isMonth=false)=>{
    sheet.mergeCells('A1:S1');
    let cell=sheet.getCell('A1');
    cell.value=isMonth?`Monthly Report ${title} Month: ${date.format('MMM YYYY')}`:`Daily Report ${title} Date: ${date.format('DD-MMM-YYYY')}`;
    cell.alignment={horizontal:'center', vertical:'middle'};
    cell.font={bold:true, size:24};    
    const summary=createSummaries(incoming, outgoing, title);
    let idx=createTableSheet(sheet, outgoing, title, true, 3);    
    createTableSheet(sheet, incoming, title, false, idx+1);
    createTableSummarySheet(sheet, summary, title, 3);
    resizeColumns(sheet);
    return sheet;
}

const convColor=(color)=>(`FF${color.split('#').join('')}`);

export const exportExcel=async(outEdifly, outTypeB, outEmail, incEdifly, incTypeB, incEmail, title, date)=>{
    const wb=new ExcelJS.Workbook();
    wb.title=title;
    wb.subject="Daily Report";
    wb.creator='ESI - EDIfly Solusi Indonesia';
    wb.created=new Date();
    const ediSheet=wb.addWorksheet('EDIfly',{properties:{tabColor:{argb:convColor(green[400])}}});
    const typSheet=wb.addWorksheet('TypeB',{properties:{tabColor:{argb:convColor(red[400])}}});
    const emaSheet=wb.addWorksheet('Email',{properties:{tabColor:{argb:convColor(blue[400])}}});
    compileRows(ediSheet, incEdifly, outEdifly, `EDIfly`, date);
    compileRows(typSheet, incTypeB, outTypeB, `TypeB`, date);
    compileRows(emaSheet, incEmail, outEmail, `Email`, date);

    const wbout=await wb.xlsx.writeBuffer();    
    saveAs(new Blob([wbout], {type:"application/octet-stream"}), `${title}.xlsx`);
    return true;
}

export const exportExcelMonthly=async(outEdifly, outTypeB, outEmail, incEdifly, incTypeB, incEmail, title, date)=>{
    const wb=new ExcelJS.Workbook();
    wb.title=title;
    wb.subject="Monthly Report";
    wb.creator='ESI - EDIfly Solusi Indonesia';
    wb.created=new Date();
    const ediSheet=wb.addWorksheet('EDIfly',{properties:{tabColor:{argb:convColor(green[400])}}});
    const typSheet=wb.addWorksheet('TypeB',{properties:{tabColor:{argb:convColor(red[400])}}});
    const emaSheet=wb.addWorksheet('Email',{properties:{tabColor:{argb:convColor(blue[400])}}});
    compileRows(ediSheet, incEdifly, outEdifly, `EDIfly`, date, true);
    compileRows(typSheet, incTypeB, outTypeB, `TypeB`, date, true);
    compileRows(emaSheet, incEmail, outEmail, `Email`, date, true);

    const wbout=await wb.xlsx.writeBuffer();    
    saveAs(new Blob([wbout], {type:"application/octet-stream"}), `${title}.xlsx`);
    return true;
}