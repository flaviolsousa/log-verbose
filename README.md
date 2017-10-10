# log-verbose

[![NPM version](https://img.shields.io/npm/v/log-verbose.svg)](https://www.npmjs.com/package/log-verbose)
[![npm](https://img.shields.io/npm/dt/log-verbose.svg)](https://github.com/flaviolsousa/log-verbose)
[![Build Status](https://travis-ci.org/flaviolsousa/log-verbose.svg?branch=master)](https://travis-ci.org/flaviolsousa/log-verbose)
[![codecov](https://codecov.io/gh/flaviolsousa/log-verbose/branch/master/graph/badge.svg)](https://codecov.io/gh/flaviolsousa/log-verbose)
[![dependencies Status](https://david-dm.org/flaviolsousa/log-verbose/status.svg)](https://david-dm.org/flaviolsousa/log-verbose)
[![Known Vulnerabilities](https://snyk.io/test/github/flaviolsousa/log-verbose/badge.svg)](https://snyk.io/test/github/flaviolsousa/log-verbose)

Simple log (use console.log) to check if 'verbose' option have been entered

## tests/sample.js
```js
const log = require('log-verbose');

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
```

```
git\log-verbose> node ./tests/sample.js
tests/sample.js:4:1 : Sample-1 Hello World!
tests/sample.js:5:5 : Sample-2 Hello World!
tests/sample.js:6:1 : Sample-3 Hello World!
tests/sample.js:8:1 : Sample-5 Hello World!
```