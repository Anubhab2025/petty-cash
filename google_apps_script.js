function doGet(e) {
  var action = e.parameter.action;
  var sheetName = e.parameter.sheetName;

  if (action === 'getLastId' && sheetName === 'Patty Expence') {
    return handleGetLastId(sheetName);
  } else if (action === 'getUsernames') {
    return handleGetUsernames();
  } else {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Invalid action or sheetName' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  var action = e.parameter.action;
  var sheetName = e.parameter.sheetName;
  var rowData = JSON.parse(e.parameter.rowData);

  if (action === 'insert' && sheetName === 'Patty Expence') {
    return handleInsertRow(sheetName, rowData);
  } else {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Invalid action or sheetName for POST' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleGetLastId(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  
  if (lastRow < 2) { // Assuming header row is 1
    return ContentService.createTextOutput(JSON.stringify({ success: true, lastId: null }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var lastId = sheet.getRange(lastRow, 2).getValue(); // Assuming ID is in column B
  return ContentService.createTextOutput(JSON.stringify({ success: true, lastId: lastId }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleInsertRow(sheetName, rowData) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  sheet.appendRow(rowData);
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleGetUsernames() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var loginSheet = ss.getSheetByName('Login');
  
  if (!loginSheet) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Login sheet not found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Get all values from Column A, skipping the header (assuming row 1 is header)
  var range = loginSheet.getRange('A2:A' + loginSheet.getLastRow());
  var values = range.getValues();
  
  // Flatten the array of arrays and filter out empty strings/nulls
  var usernames = values.map(function(row) {
    return row[0];
  }).filter(String); // Filters out empty strings

  return ContentService.createTextOutput(JSON.stringify({ success: true, usernames: usernames }))
    .setMimeType(ContentService.MimeType.JSON);
}