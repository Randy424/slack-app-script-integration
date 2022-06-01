# slack-app-script-integration

_Slack integration script for Google sheets/docs_

## Prerequisites

### Node/NPM

- node -v

### Clasp

- Official clasp repo (https://github.com/google/clasp)
- Install Clasp
  - `npm install -g @google/clasp`
  - or
  - `npm install -dev @google/clasp`

## Using Clasp

- Login into your google account
  - `clasp login`
  - Will direct you to auth via your web browser
- Pull down the live project
  - `clasp pull [project -id]`
- Push up changes
  - `clasp push`
  - May require enabling clasp API for your google account via web browser, in this case you'll be directed to a browser automatically.

## Overview

### The integration

- The current integration was designed to pull input from a google spreadsheet, in the form of a table, via the google spreadsheet API. Once consumed, the spreadsheet data is reorganized into a list of slack block objects and submitted to the slack webhook we have created for the workspace.

- Google App Scripts also provides time sensitive triggers for srcipt execution. We have one such trigger pointed at our "buildReport" function. The trigger executes every day between 7am and 8am EST. These triggers can be further customized to execute at different time intervals and upon successful edit of the active spreadsheet.

### For spreadsheet users

- Connected Spreadsheet (https://docs.google.com/spreadsheets/d/1dhRKjTKjokHHZ8HhBc3eNDfydU328fYdXSV6PvEteTU/edit#gid=0)
- On the sheet titled "Data", simply update the table manually and use the buttons below the table to trigger a notification push to Slack or to archive a table.
- "Archive" copies the current table + notes to the sheet titled "Archive". This feature was added to store previously published information for posterity.
