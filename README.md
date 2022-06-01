# slack-app-script-integration

_Slack integration script for Google sheets/docs_

## Prerequisites

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
  - May require enabling clasp API for your google account via web browser

## Overview

### The integration

- The current integration was designed to pull input from a google spreadsheet, in the form of a table, via the google spreadsheet API. Once consumed, the spreadsheet data is reorganized into a list of slack block objects and submitted to the slack webhook we have created for the workspace.

### For spreadsheet users

- Simply update the table manually
