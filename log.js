'use strict';

const appRoot = `${require('app-root-path')}`;

function validFilters(options, text) {
  options.verboseFilters = options.verboseFilters || [];
  if (options.verboseFilters.length == 0) {
    return true;
  } else {
    for (let i = 0; i < options.verboseFilters.length; i++) {
      const filter = options.verboseFilters[i];
      if (typeof filter === 'string' && text.indexOf(filter) >= 0) {
        return true;
      } else if (filter instanceof RegExp && text.match(filter)) {
        return true;
      }
    }
  }
  return false;
}

function valueToString(v) {
  let r = v;
  if (typeof v === 'function') {
    r = '' + v;
  } else if (typeof v === 'object') {
    try {
      if (v instanceof Error) {
        r = '\n' + (v.stack || v.stacktrace || '') + '\n';
      } else {
        r = JSON.stringify(v);
      }
    } catch (err) {
      r = `ERROR: "${err.message}"`;
    }
  }
  return r;
}

function log() {
  if (arguments && arguments.length > 1) {
    const options = arguments[0] || {};
    if (options.verbose === true) {
      try {
        const logIgnoreStackLines = options['ignoreStackLines'] || 0;
        const logLine = (options['log-line'] || 2) + logIgnoreStackLines;
        /* eslint-disable */
        let vStack2 = ((new Error().stack).split("at ")[logLine]).trim().replace(/.*\(/, '').replace(/\).*/, ''); 
        /* eslint-enable */

        let exec = vStack2.replace(/\s.*/gi, '');
        exec = exec.substr(appRoot.length + 1);
        exec = exec.replace(/\\/g, '/');

        const value = [exec, ':'];
        for (let i = 1; i < arguments.length; i++) {
          let v = arguments[i];
          v = valueToString(v);
          value.push(v);
        }

        if (options['log-print'] || validFilters(options, value.join(''))) {
          console.log.apply(null, value);
        }
      } catch (error) {
        console.log(error);
        console.log(JSON.stringify(error));
      }
    }
  }
}

log.print = function() {
  const args = [];
  args.push({
    'verbose': true,
    'log-print': true,
    'log-line': 3,
  });
  for (let i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  log.apply(this, args);
};

log.filters = [];

module.exports = log;
