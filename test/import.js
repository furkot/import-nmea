const test = require('node:test');
const assert = require('node:assert/strict');
const importNmea = require('../');

test.todo('import-nmea must have at least one test', function () {
  importNmea();
  assert.ok(true, 'Need to write tests.');
});
