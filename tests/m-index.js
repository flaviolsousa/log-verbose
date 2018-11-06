const assert = require('assert');

function argumentsToString(ags) {
  let result = '';
  for (let i = 0; i < ags.length; i++) {
    result += ags[i];
  }
  return result;
}

(() => {
  'use strict';

  const log = require('../log');

  describe('index', function() {
    it('Log verbose true', function(done) {
      const cLog = console.log;
      try {
        const text = 'Flavio';
        console.log = function() {
          cLog.apply(this, arguments);
          assert.ok(arguments.length >= 1, 'Invalid length text');
          const textLog = argumentsToString(arguments);
          assert.ok(textLog.endsWith(text), 'Invalid text (' + text + '):(' + textLog + ')');
          assert.ok(textLog.indexOf('tests/m-index.js') >= 0, 'FileName not found');
          console.log = cLog;
          done();
        };
        log({verbose: true}, text);
      } catch (error) {
        console.log = cLog;
        assert.fail(error);
      } finally {
        console.log = cLog;
      }
    });

    it('Log print', function(done) {
      const cLog = console.log;
      try {
        const text = 'Flavio';
        console.log = function() {
          cLog.apply(this, arguments);
          assert.ok(arguments.length >= 1, 'Invalid length text');
          const textLog = argumentsToString(arguments);
          assert.ok(textLog.endsWith(text), 'Invalid text (' + text + '):(' + textLog + ')');
          assert.ok(textLog.indexOf('tests/m-index.js') >= 0, 'FileName not found');
          console.log = cLog;
          done();
        };
        log.print(text);
      } catch (error) {
        console.log = cLog;
        assert.fail(error);
      } finally {
        console.log = cLog;
      }
    });

    it('Log filter string', function(done) {
      const cLog = console.log;
      try {
        const text = 'Flavio 123';
        console.log = function() {
          cLog.apply(this, arguments);
          assert.ok(arguments.length >= 1, 'Invalid length text');
          const textLog = argumentsToString(arguments);
          assert.ok(textLog.endsWith(text), 'Invalid text (' + text + '):(' + textLog + ')');
          assert.ok(textLog.indexOf('tests/m-index.js') >= 0, 'FileName not found');
          console.log = cLog;
          done();
        };
        const options = {verbose: true, verboseFilters: ['123']};
        log(options, text);
      } catch (error) {
        console.log = cLog;
        assert.fail(error);
      } finally {
        console.log = cLog;
      }
    });

    it('Log filter regex', function(done) {
      const cLog = console.log;
      try {
        const text = 'Flavio 123';
        console.log = function() {
          cLog.apply(this, arguments);
          assert.ok(arguments.length >= 1, 'Invalid length text');
          const textLog = argumentsToString(arguments);
          assert.ok(textLog.endsWith(text), 'Invalid text (' + text + '):(' + textLog + ')');
          assert.ok(textLog.indexOf('tests/m-index.js') >= 0, 'FileName not found');
          console.log = cLog;
          done();
        };
        const options = {verbose: true, verboseFilters: [/.*\d+.*/g]};
        log(options, text);
      } catch (error) {
        console.log = cLog;
        assert.fail(error);
      } finally {
        console.log = cLog;
      }
    });


    it('Log filter string - NoLog', function(done) {
      const cLog = console.log;
      try {
        const text = 'Flavio 123';
        console.log = function() {
          cLog.apply(this, arguments);
          assert.fail('Invalid Log');
          console.log = cLog;
        };
        setTimeout(function() {
          console.log = cLog;
          done();
        }, 500);
        const options = {verbose: true, verboseFilters: ['987']};
        log(options, text);
      } catch (error) {
        console.log = cLog;
        assert.fail(error);
      } finally {
        console.log = cLog;
      }
    });

    it('Log filter regex - NoLog', function(done) {
      const cLog = console.log;
      try {
        const text = 'Flavio';
        console.log = function() {
          cLog.apply(this, arguments);
          assert.fail('Invalid Log');
          console.log = cLog;
        };
        setTimeout(function() {
          console.log = cLog;
          done();
        }, 500);
        const options = {verbose: true, verboseFilters: [/.*Sousa.*/g]};
        log(options, text);
      } catch (error) {
        console.log = cLog;
        assert.fail(error);
      } finally {
        console.log = cLog;
      }
    });

    it('Log object and boolean', function(done) {
      const cLog = console.log;
      try {
        const valueLog = {name: 'Flavio'};
        console.log = function() {
          cLog.apply(this, arguments);
          assert.ok(arguments.length >= 1, 'Invalid length text');
          const textLog = argumentsToString(arguments);
          assert.ok(textLog.indexOf('MyObject') >= 0, 'MyObject not found');
          assert.ok(textLog.indexOf('subObject') >= 0, 'subObject not found');
          assert.ok(textLog.indexOf('true') >= 0, 'true not found');
          assert.ok(textLog.indexOf('tests/m-index.js') >= 0, 'FileName not found');
          console.log = cLog;
          done();
        };
        log({verbose: true}, 'MyObject:', valueLog, '| boolean:', true, '| array: ', ['test', 1, {subObject: 'str'}]);
      } catch (error) {
        console.log = cLog;
        assert.fail(error);
      } finally {
        console.log = cLog;
      }
    });
  });

  it('Log Error', function(done) {
    const cLog = console.log;
    try {
      console.log = function() {
        cLog.apply(this, arguments);
        assert.ok(arguments.length >= 1, 'Invalid length text');
        const textLog = argumentsToString(arguments);
        assert.ok(textLog.indexOf('Test error log') >= 0, 'Error Description not found');
        assert.ok(textLog.indexOf('log-verbose/tests/m-index.js:') >= 0, 'Stack error not found');


        console.log = cLog;
        done();
      };

      log({verbose: true}, new Error('Test error log!'));
    } catch (error) {
      console.log = cLog;
      assert.fail(error);
    } finally {
      console.log = cLog;
    }
  });

  it('Log Error', function(done) {
    const cLog = console.log;
    try {
      console.log = function() {
        cLog.apply(this, arguments);
        assert.ok(arguments.length >= 1, 'Invalid length text');
        const textLog = argumentsToString(arguments);
        assert.ok(textLog.indexOf('argumentsToString') >= 0, 'Function name not found');
        assert.ok(textLog.indexOf('return') >= 0, 'Function source not found');


        console.log = cLog;
        done();
      };

      log({verbose: true}, argumentsToString);
    } catch (error) {
      console.log = cLog;
      assert.fail(error);
    } finally {
      console.log = cLog;
    }
  });
})();
