const assert = require('assert');

function argumentsToString(arguments) {
  let result = '';
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

(() => {
  'use strict';

  const log = require('../log');

  describe("index", function () {

    it('Log verbose true', function (done) {
      let c_log = console.log;
      try {

        let text = 'Flavio';
        console.log = function () {
          c_log.apply(this, arguments);
          assert.ok(arguments.length >= 1, 'Invalid length text');
          let textLog = argumentsToString(arguments);
          assert.ok(textLog.endsWith(text), 'Invalid text (' + text + '):(' + textLog + ')');
          assert.ok(textLog.indexOf('tests/m-index.js') >= 0, 'FileName not found');
          console.log = c_log;
          done();
        };
        log({ verbose: true }, text);

      } catch (error) {
        console.log = c_log;
        assert.fail(error);
      } finally {
        console.log = c_log;
      }
    });

    it('Log print', function (done) {
      let c_log = console.log;
      try {

        let text = 'Flavio';
        console.log = function () {
          c_log.apply(this, arguments);
          assert.ok(arguments.length >= 1, 'Invalid length text');
          let textLog = argumentsToString(arguments);
          assert.ok(textLog.endsWith(text), 'Invalid text (' + text + '):(' + textLog + ')');
          assert.ok(textLog.indexOf('tests/m-index.js') >= 0, 'FileName not found');
          console.log = c_log;
          done();
        };
        log.print(text);

      } catch (error) {
        console.log = c_log;
        assert.fail(error);
      } finally {
        console.log = c_log;
      }
    });

    it('Log filter string', function (done) {
      let c_log = console.log;
      try {

        let text = 'Flavio 123';
        console.log = function () {
          c_log.apply(this, arguments);
          assert.ok(arguments.length >= 1, 'Invalid length text');
          let textLog = argumentsToString(arguments);
          assert.ok(textLog.endsWith(text), 'Invalid text (' + text + '):(' + textLog + ')');
          assert.ok(textLog.indexOf('tests/m-index.js') >= 0, 'FileName not found');
          console.log = c_log;
          done();
        };
        let options = { verbose: true, verboseFilters: ['123'] };
        log(options, text);

      } catch (error) {
        console.log = c_log;
        assert.fail(error);
      } finally {
        console.log = c_log;
      }
    });

    it('Log filter regex', function (done) {
      let c_log = console.log;
      try {

        let text = 'Flavio 123';
        console.log = function () {
          c_log.apply(this, arguments);
          assert.ok(arguments.length >= 1, 'Invalid length text');
          let textLog = argumentsToString(arguments);
          assert.ok(textLog.endsWith(text), 'Invalid text (' + text + '):(' + textLog + ')');
          assert.ok(textLog.indexOf('tests/m-index.js') >= 0, 'FileName not found');
          console.log = c_log;
          done();
        };
        let options = { verbose: true, verboseFilters: [/.*\d+.*/g] };
        log(options, text);

      } catch (error) {
        console.log = c_log;
        assert.fail(error);
      } finally {
        console.log = c_log;
      }
    });



    it('Log filter string - NoLog', function (done) {
      let c_log = console.log;
      try {

        let text = 'Flavio 123';
        console.log = function () {
          c_log.apply(this, arguments);
          assert.fail('Invalid Log');
          console.log = c_log;
        };
        setTimeout(function () {
          console.log = c_log;
          done();
        }, 500);
        let options = { verbose: true, verboseFilters: ['987'] };
        log(options, text);

      } catch (error) {
        console.log = c_log;
        assert.fail(error);
      } finally {
        console.log = c_log;
      }
    });

    it('Log filter regex - NoLog', function (done) {
      let c_log = console.log;
      try {

        let text = 'Flavio';
        console.log = function () {
          c_log.apply(this, arguments);
          assert.fail('Invalid Log');
          console.log = c_log;
        };
        setTimeout(function () {
          console.log = c_log;
          done();
        }, 500);
        let options = { verbose: true, verboseFilters: [/.*Sousa.*/g] };
        log(options, text);

      } catch (error) {
        console.log = c_log;
        assert.fail(error);
      } finally {
        console.log = c_log;
      }
    });

  });
})();
