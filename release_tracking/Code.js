function prependRow(rows) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var destinationSheet = sheet.getSheetByName("Archive");

  destinationSheet.insertRowsBefore(1, rows);
}
//test

function copyPreviousList() {
  var ss = SpreadsheetApp.getUi();
  // confirmation alert, note that while this is active running script from this editor isn't possible, fails with context error
  // comment out alert to get around this
  var response = ss.alert("Archive current table?", ss.ButtonSet.YES_NO);
  if (response == ss.Button.YES) {
    prependRow(10);
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var originSheet = sheet.getSheetByName("Data");
    var listToCopy = originSheet.getRange("A1:D8");
    var destinationSheet = sheet.getSheetByName("Archive");
    listToCopy.copyTo(destinationSheet.getRange("1", 1));
    prependRow(1);
    destinationSheet
      .getRange("A1:A1")
      .setValue(
        "Archived on: " + Utilities.formatDate(new Date(), "EST", "MM-dd-yyyy")
      );
  }
}

function buildReport() {
  const su = SpreadsheetApp.getUi();
  // confirmation alert, note that while this is active running script from this editor isn't possible, fails with context error
  // comment out alert to get around this
  var response = su.alert("Push current table to Slack?", su.ButtonSet.YES_NO);
  if (response == su.Button.YES) {
    const sa = SpreadsheetApp.getActive();
    let tableData = sa.getSheetByName("Data").getRange("A1:D5").getValues();
    let notes = sa.getSheetByName("Data").getRange("A8:A8").getValues();
    let payload = buildAlert(tableData, notes);
    sendAlert(payload);
  }
}

function buildAlert(tableData, notes) {
  let totaldate = tableData[0][1];
  let dateBreakdown = [];
  tableData.forEach(function (row) {
    if (row[0] === "Release stream") {
      dateBreakdown.push(
        "*" +
          row[0] +
          "*" +
          "  |  " +
          row[1] +
          "  :technologist:" +
          "   |  " +
          row[2] +
          "  :cold_face:" +
          "    |  " +
          row[3] +
          " :rocket:"
      );
    } else {
      dateBreakdown.push(
        "---------------------------------------------------------------------------------------------------------"
      );
      dateBreakdown.push(
        valueWithPadding(row[0]) +
          " |  " +
          formatDate(row[1]) +
          "                     |  " +
          formatDate(row[2]) +
          "            |  " +
          formatDate(row[3])
      );
    }
  });
  dateBreakdown = dateBreakdown.join("\n");
  console.log("checking breakdown: ", dateBreakdown);
  let payload = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":bell: *Today's release branch status* :bell:",
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "_* As of: " +
            Utilities.formatDate(new Date(), "EST", "MM-dd-yyyy") +
            "*_",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: dateBreakdown,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: notes[0][0],
        },
      },
    ],
  };
  return payload;
}

function valueWithPadding(value) {
  console.log("length: ", value.length);
  let maxPaddingSize = 14;
  let paddedValue = "";
  console.log(maxPaddingSize - value.length);
  for (let i = maxPaddingSize - value.length; i > 0; i--) {
    paddedValue += "  ";
  }

  return value + paddedValue;
}

function formatDate(date) {
  if (date == "" || typeof date === "string") return date;
  return Utilities.formatDate(date, "EST", "MM-dd-yyyy");
}

function sendAlert(payload) {
  const webhook =
    "https://hooks.slack.com/services/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"; //Paste your webhook URL here
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  try {
    UrlFetchApp.fetch(webhook, options);
  } catch (e) {
    Logger.log(e);
  }
}
