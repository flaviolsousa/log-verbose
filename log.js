
'use strict';

const appRoot = require('app-root-path') + '';

function validFilters(options, text) {
  options.verboseFilters = options.verboseFilters || [];
  if (options.verboseFilters.length == 0) {
    return true;
  } else {
    for (var i = 0; i < options.verboseFilters.length; i++) {
      var filter = options.verboseFilters[i];
      if (typeof filter === 'string' && text.indexOf(filter) >= 0) {
        return true;
      } else if (filter instanceof RegExp && text.match(filter)) {
        return true;
      }
    }
  }
  return false;
}

function log() {
  if (arguments && arguments.length > 0) {
    const options = arguments[0] || {};
    if (options.verbose === true) {
      try {
        let logLine = options['log-line'] || 2;
        let vStack2 = ((new Error().stack).split("at ")[logLine]).trim().replace(/.*\(/, '').replace(/\).*/, '');

        let exec = vStack2.replace(/\s.*/ig, "");
        exec = exec.substr(appRoot.length + 1);
        exec = exec.replace(/\\/g, '/');

        let value = [exec, ':'];
        for (var i = 1; i < arguments.length; i++) {
          value.push(arguments[i]);
        }
        exec += ': ' + value;

        if (options['log-print'] || validFilters(options, value.join(''))) {
          console.log.apply(this, value);
        }
      } catch (error) {
        console.log(error);
        console.log(JSON.stringify(error));
      }
    }
  }
}

log.print = function () {
  let args = [];
  args.push({
    verbose: true,
    'log-print': true,
    'log-line': 3
  });
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  log.apply(this, args);
};

log.filters = [];

module.exports = log;
