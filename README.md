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

```
Output:
```
tests/sample.js:5:5 : Sample-1 Hello World!
tests/sample.js:7:1 : Sample-2 Hello World!
tests/sample.js:9:1 : Sample-3 Object: {"test":{"a":1,"b":true}}
tests/sample.js:11:1 : Sample-4 Hello World!
tests/sample.js:15:1 : Sample-6 Hello World!
tests/sample.js:28:1 : Sample-11 function to simplify the use. Will indicate this line in the log!
tests/sample.js:30:1 : Sample-12 function c() {
  log({verbose: true, ignoreStackLines: 1}, ...arguments);
}
tests/sample.js:32:1 : Sample-13
Error: Test error log!
    at Object.<anonymous> (/home/mtzcpd262/Documents/git/log-verbose/tests/sample.js:32:35)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:188:16)
    at bootstrap_node.js:609:3

```