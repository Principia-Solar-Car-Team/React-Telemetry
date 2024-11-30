const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class Report {
  constructor(logfile = null) {
    this.nPass = 0;
    this.nWarn = 0;
    this.nFail = 0;
    this.nTotal = 0;
    this.logfile = logfile ? fs.createWriteStream(logfile, { flags: 'a' }) : null;
  }

  report(testName, errorCondition = true, warnCondition = true, valueString = '', errorString = '', status = false) {
    let printBuffer = testName;
    const printLength = 50;
    const valueLength = 20;

    // Adjust padding for the test name
    printBuffer = printBuffer.padEnd(printLength, '.');

    // Adjust padding for the value string
    printBuffer += valueString.padEnd(valueLength, '.');

    // Check the error and warning conditions
    if (!errorCondition) {
      if (!warnCondition) {
        if (!status) {
          printBuffer += chalk.green('[ok]');
          this.nPass++;
        } else {
          printBuffer += chalk.blue('[status]');
        }
      } else {
        printBuffer += chalk.yellow('[warn]');
        this.nWarn++;
      }
    } else {
      printBuffer += chalk.red(`[fail] ${errorString}`);
      this.nFail++;
    }

    console.log(printBuffer);
    if (this.logfile) {
      this.logfile.write(printBuffer + '\n');
    }
    this.nTotal++;
  }

  getSummary() {
    return {
      total: this.nTotal,
      pass: this.nPass,
      warn: this.nWarn,
      fail: this.nFail
    };
  }
}

// Usage Example
const rpt = new Report('test_log.txt');
rpt.report('Test 1', false, false, 'Value: 42', '', false);
rpt.report('Test 2', true, true, 'Value: 10', 'An error occurred', true);
rpt.report('Test 3', false, true, 'Value: 25', '', false);
