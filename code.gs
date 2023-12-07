function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  
  if (sheet.getName() === 'data') { // Replace 'YourSheetName' with your sheet name
    var range = e.range;
    var col = range.getColumn();
    if (col === 4) { // Assuming machine numbers are in column C
      var row = range.getRow();
      var currentDate = new Date();
      var timeZone = Session.getScriptTimeZone();
      sheet.getRange(row, 1).setValue(1);

      // Place the date in column A
      sheet.getRange(row, 2).setValue(currentDate);
      
      // Format the time to HH:mm
      var formattedTime = Utilities.formatDate(currentDate, timeZone, "HH:mm");
      
      // Place the time in column B
      sheet.getRange(row, 3).setValue(formattedTime);
      sheet.getRange(row+1,1).setValue(calculateSum());
    }
  }
}

function calculateSum() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data'); // Replace 'Sheet1' with your sheet name
  var lastRow = sheet.getLastRow();
  var sumRange = sheet.getRange("A2:A" + lastRow); // Assuming the sum range is in column A
  
  var sum = 0;
  if (lastRow > 1) {
    sum = sumRange.getValues().flat().reduce(function(acc, val) {
      return acc + val;
    });
  }
  
  return sum; // Place the sum in the next row of column A
}



function updateDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("data");
  var dashboardSheet = ss.getSheetByName("dashboard");
  
  // Get the data from the "data" sheet
  var data = dataSheet.getDataRange().getValues();
  
  // Create an object to store the sum of entries for each day
  var sumByDate = {};
  
  // Iterate through the data and calculate the sum for each day
  for (var i = 1; i < data.length; i++) { // Start from the second row to skip headers
    var date = new Date(data[i][1]);
    var formattedDate = Utilities.formatDate(date, ss.getSpreadsheetTimeZone(), "dd/MM/yyyy");
    if (!sumByDate[formattedDate]) {
      sumByDate[formattedDate] = 0;
    }
    sumByDate[formattedDate]++;
  }
  
  // Clear the existing data in the dashboard sheet
  dashboardSheet.clear();
  
  // Write the headers to the dashboard sheet
  dashboardSheet.getRange(1, 1).setValue("Date");
  dashboardSheet.getRange(1, 2).setValue("Sum");
  dashboardSheet.getRange(1, 3).setValue("Diff");

  // Write the sum of entries to the dashboard sheet
  var row = 2;
  for (var date in sumByDate) {
    dashboardSheet.getRange(row, 1).setValue(date);
    dashboardSheet.getRange(row, 2).setValue(sumByDate[date]);
    if(row>2){
      var sum1 = dashboardSheet.getRange(row, 2).getValue();
      var sum2 = dashboardSheet.getRange(row-1, 2).getValue();
      dashboardSheet.getRange(row, 3).setValue(Math.abs(sum1-sum2));
    }
    row++;
    to change according
  }
}