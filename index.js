// Test 1: Using npm printer
let printer = require('printer');

printer.printDirect({
    data: " InstaPrint test print number 1 ",
    type: 'RAW',
    success: (jobID) => {
        console.log('Sent to printer, JobID: ', jobID);
    },
    error: (err) => {
        console.log('error: ', err);
    }
});