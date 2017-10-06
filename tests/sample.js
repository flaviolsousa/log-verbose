const log = require('../log');//const log = require('log-verbose');

let text = 'Hello World!';
log.print('Sample-1',  text);  // Always Show
log({ verbose: true }, 'Sample-2', text); // log only if verbose = true
log({ verbose: true, verboseFilters: ['sample.js', /.*class.*/g] }, 'Sample-3', text); // filter by sample.js ou class strings
log({ verbose: true, verboseFilters: ['*.js', /.*class.*/g] }, 'Sample-4', text); // filter string string DON'T support masking character 
log({ verbose: true, verboseFilters: [/.*\.js/g] }, 'Sample-5', text); // sample with regex (search all js files to log)
log({}, 'Sample-6', text); // no log
log({verbose: false}, 'Sample-7', text); // no log
log(null, 'ample-S8', text); // no log
log('Sample-9'); // no log

