import ExcelJS from 'exceljs';
import {saveAs} from 'file-saver';
import moment from 'moment';

/**
 * Format Cell  
 * @param {ExcelJS.Cell} cell 
 * @param {any} value 
 * @param {string} format 
 * @param {boolean} bold 
 * @param {any} align 
 */

const formatCell=(cell, value, format="", bold=false, align={horizontal:'center', vertical:'middle'}, noBorder=false )=>{
    if(format!=='')cell.numFmt=format;
    if(bold)cell.font={bold:true};
    cell.alignment=align;
    cell.value=value;
    if(!noBorder)cell.border={bottom:{style:'thin'}, top:{style:'thin'}, left:{style:'thin'}, right:{style:'thin'}};
}

const getValue=(row, cell)=>{
    const {type, name, field, format}=cell;
    let val = (!!field)?(row[name] && row[name][field]) || '-' : row[name];
    let xlsFormat='';
    let align={horizontal:'center'};
    switch (type) {
        case 'time':
            val=!!val?moment(val).format(format):'';
            break;
        case 'number':
            xlsFormat='#,##0';
            align={horizontal:'right'};
            break;
        default:
            break;
    }
    return [val, xlsFormat, align];
}

/**
 * 
 * @param {ExcelJS.Worksheet} sheet 
 * @param {Array} header 
 * @param {Array} data 
 * @param {Array} field 
 * @param {string} title 
 * @param {string} periode 
 */
const createReport=(sheet, hdr, data, field, title, periode)=>{
    const header = ['#', ...hdr];
    const len=header.length;
    
    let endCell=sheet.getCell(1, len);
    sheet.mergeCells(`A1:${endCell.address}`);
    
    endCell=sheet.getCell(2, len);
    sheet.mergeCells(`A2:${endCell.address}`);
    
    formatCell(sheet.getCell('A1'), title, '', true, {horizontal:'center', vertical:'middle'}, true );
    formatCell(sheet.getCell('A2'), periode, '', true, {horizontal:'center', vertical:'middle'}, true);
    
    for (let iii = 0; iii < header.length; iii++) {
        const head = header[iii];
        formatCell(sheet.getCell(3, iii+1), head, '', true);
    }
    let startRow = 4;
    let lastRow = 4;
    for (let iv = 0; iv < data.length; iv++) {
        const row = data[iv];
        formatCell(sheet.getCell(startRow+iv, 1), iv+1, '', false, {horizontal:'right'});
        for (let vvv = 0; vvv < field.length; vvv++) {
            const f = field[vvv];
            const [value, format, align]=getValue(row, f);
            formatCell(sheet.getCell(4+iv, vvv+2), value, format, false, align);
        }
        lastRow++;
    }    
    formatCell(sheet.getCell(lastRow, 1), 'Total','', false, {horizontal:'center'});
    for (let xxx = 0; xxx < field.length; xxx++) {
        const {type} = field[xxx];
        if(type==='number')
        {         
            const last=sheet.getCell(lastRow-1, xxx+2).address;
            const start=sheet.getCell(startRow, xxx+2).address;
            formatCell(sheet.getCell(lastRow, xxx+2), {formula:`SUM(${start}:${last})`}, '#,##0', false, {horizontal:'right'});
            continue;
        }
        formatCell(sheet.getCell(lastRow, xxx+2), '', '', false);
    }
}

/**
 * 
 * @param {Array} data 
 * @param {Array} header 
 * @param {Array} field 
 * @param {string} repType 
 * @param {string} periode 
 * @returns {any}
 */

export const ExportExcel=async(data, header, field, repType, periode)=>{
    const Title=`${repType} Report`.toUpperCase();
    const wb=new ExcelJS.Workbook();
    wb.title=Title;
    wb.subject=`${Title} Periode ${periode}`;
    wb.creator=`ESI - EDIFly Solusi Indonesia ~~~HK~~~`;
    wb.created=new Date();
    const sheet=wb.addWorksheet('Report', {properties:{tabColor:{argb:'FF00FF00'}}});
    createReport(sheet, header, data, field, Title, periode);
    const wbout=await wb.xlsx.writeBuffer();    
    const filename=`${repType}_report_${periode}`;
    saveAs(new Blob([wbout], {type:"application/octet-stream"}), `${filename}.xlsx`);
    return true;
}