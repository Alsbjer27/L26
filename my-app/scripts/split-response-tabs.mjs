import fs from 'node:fs';
import { google } from 'googleapis';
import { responseLayouts, sheetDate } from '../lib/response-layouts.mjs';

const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)
  .filter(line => /^[A-Z_][A-Z0-9_]*=/.test(line)).map(line => {
    const i = line.indexOf('=');
    return [line.slice(0, i), line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')];
  }));
const credentials = JSON.parse(Buffer.from(env.CREDS_BASE64, 'base64').toString('utf8'));
const auth = new google.auth.JWT({email: credentials.client_email, key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']});
const sheets = google.sheets({version: 'v4', auth});
const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;
const options = {timeout: 15000, retry: false};
const quote = name => `'${name.replace(/'/g, "''")}'`;

async function main() {
  const metadata = await sheets.spreadsheets.get({spreadsheetId, fields: 'sheets.properties'}, options);
  const properties = metadata.data.sheets.map(sheet => sheet.properties);
  const source = properties.find(sheet => sheet.sheetId === Number(env.GOOGLE_SHEETS_TAB_ID || 0));
  if (!source) throw Error('Original response tab not found');
  const existing = await sheets.spreadsheets.values.get({spreadsheetId, range: `${quote(source.title)}!A:L`}, options);
  const rows = existing.data.values || [];
  const expected = ['Submitted at (UTC)','Name','Email','Programme','Message','Form type','Role','Nominee','Nominee email','Experience','LIU-ID','Class'];
  if (JSON.stringify(rows[0]) !== JSON.stringify(expected)) throw Error('Original headers differ; stopped without changes');
  // Each migration is written together with a note on A1 in one atomic batch.
  for (const [type, layout] of Object.entries(responseLayouts)) {
    let target = properties.find(sheet => sheet.title === layout.tab);
    if (target) {
      const check = await sheets.spreadsheets.get({spreadsheetId, ranges: `${quote(layout.tab)}!A1`, includeGridData: true}, options);
      if (check.data.sheets?.[0]?.data?.[0]?.rowData?.[0]?.values?.[0]?.note === 'Legionen split migration v1') {
        console.log(`${layout.tab}: already prepared; unchanged`);
        continue;
      }
      throw Error(`Tab ${layout.tab} already exists without migration marker; refusing to overwrite`);
    }
    const migrated = rows.slice(1).filter(row => row[5] === type).map(row => {
      const data = {name:row[1]||'',email:row[2]||'',message:row[4]||'',role:row[6]||'',nominee:row[7]||'',liuId:row[10]||'',className:row[11]||''};
      return [sheetDate(row[0]), ...layout.fields.map(field => data[field])];
    });
    const sheetId = Math.max(...properties.map(sheet => sheet.sheetId), 0) + 1;
    const count = layout.headers.length;
    const range = {sheetId, startRowIndex:0, endRowIndex:Math.max(1000,migrated.length+100), startColumnIndex:0,endColumnIndex:count};
    const data = [layout.headers,...migrated].map((row,index) => ({values:row.map((value,col) => ({
      userEnteredValue: typeof value === 'number' ? {numberValue:value} : {stringValue:value},
      ...(index===0 && col===0 ? {note:'Legionen split migration v1'} : {}),
    }))}));
    await sheets.spreadsheets.batchUpdate({spreadsheetId,requestBody:{requests:[
      {addSheet:{properties:{sheetId,title:layout.tab,gridProperties:{rowCount:range.endRowIndex,columnCount:count,frozenRowCount:1}}}},
      {updateCells:{start:{sheetId,rowIndex:0,columnIndex:0},rows:data,fields:'userEnteredValue,note'}},
      {repeatCell:{range,cell:{userEnteredFormat:{verticalAlignment:'TOP',wrapStrategy:'WRAP',textFormat:{fontFamily:'Arial',fontSize:11}}},fields:'userEnteredFormat'}},
      {repeatCell:{range:{sheetId,startRowIndex:0,endRowIndex:1},cell:{userEnteredFormat:{backgroundColor:{red:0.35,green:0.07,blue:0.08},textFormat:{bold:true,foregroundColor:{red:1,green:1,blue:1}}}},fields:'userEnteredFormat.backgroundColor,userEnteredFormat.textFormat'}},
      {repeatCell:{range:{sheetId,startRowIndex:1,startColumnIndex:0,endColumnIndex:1},cell:{userEnteredFormat:{numberFormat:{type:'DATE_TIME',pattern:'yyyy-mm-dd hh:mm'}}},fields:'userEnteredFormat.numberFormat'}},
      {setBasicFilter:{filter:{range}}},
      {updateDimensionProperties:{range:{sheetId,dimension:'COLUMNS',startIndex:0,endIndex:count},properties:{pixelSize:170},fields:'pixelSize'}},
      {updateDimensionProperties:{range:{sheetId,dimension:'COLUMNS',startIndex:count-1,endIndex:count},properties:{pixelSize:480},fields:'pixelSize'}},
      ...(type==='application'?[{updateDimensionProperties:{range:{sheetId,dimension:'COLUMNS',startIndex:3,endIndex:4},properties:{pixelSize:250},fields:'pixelSize'}}]:[]),
    ]}},options);
    properties.push({sheetId,title:layout.tab});
    const verify = await sheets.spreadsheets.values.get({spreadsheetId,range:`${quote(layout.tab)}!A1:${String.fromCharCode(64+count)}${migrated.length+1}`,valueRenderOption:'UNFORMATTED_VALUE'},options);
    if (JSON.stringify(verify.data.values)!==JSON.stringify([layout.headers,...migrated])) throw Error('Verification mismatch');
    console.log(`${layout.tab}: created and verified ${migrated.length} existing responses`);
  }
  console.log('Original tab preserved. No website deployment performed.');
}
main().catch(error => { console.error(error.message); process.exitCode=1; });

