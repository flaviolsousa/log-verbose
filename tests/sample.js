const log = require('../log');// const log = require('log-verbose');

const text = 'Hello World!';

log.print('Sample-1', text); // Always Show

log({verbose: true}, 'Sample-2', text); // log only if verbose = true

log({verbose: true}, 'Sample-3', 'Object:', {test: {a: 1, b: true}}); // log object

log({verbose: true, verboseFilters: ['sample.js', /.*class.*/g]}, 'Sample-4', text); // filter by sample.js ou class strings

log({verbose: true, verboseFilters: ['*.js', /.*class.*/g]}, 'Sample-5', text); // filter string string DON'T support masking character

log({verbose: true, verboseFilters: [/.*\.js/g]}, 'Sample-6', text); // sample with regex (search all js files to log)

log({}, 'Sample-7', text); // no log

log({verbose: false}, 'Sample-8', text); // no log

log(null, 'ample-S9', text); // no log

log('Sample-10'); // no log

function c() {
  log({verbose: true, ignoreStackLines: 1}, ...arguments);
}
c('Sample-11', 'function to simplify the use.', 'Will indicate this line in the log!');

log({verbose: true}, 'Sample-12', c);

log({verbose: true}, 'Sample-13', new Error('Test error log!'));


// --------------------
// node tests/sample

