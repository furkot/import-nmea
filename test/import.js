const test = require('node:test');
const assert = require('node:assert/strict');

const { createReadStream } = require('node:fs');
const path = require('node:path');
const { Readable } = require('node:stream');

const parse = require('../');


/* global TextDecoderStream, ReadableStream */

test('parse empty', async function () {
  const stream = ReadableStream.from([]);
  const trip = await parse(stream);
  assert.deepEqual(trip, {
    track: [
      []
    ]
  });
});

test('parse single entry', async function () {
  const stream = ReadableStream.from([
    '$GPGGA,083712.8,4633.3793,N,',
    '01148.6548,E,1,,,180.6,M,,M,,*6B'
  ]);
  const trip = await parse(stream);
  assert.deepEqual(trip, {
    track: [
      [{
        coordinates: {
          lat: 46.55632166666667,
          lon: 11.810913333333334
        },
        timestamp: '2023-09-25T08:37:12.800Z'
      }]
    ]
  });
});

test('ignore non GGA entries', async function () {
  const stream = ReadableStream.from([
    '$GPRMC,083656.4,A,4633.3808,N,01148.6489,E,,,050923,,*0A\n',
    '$GPGGA,083712.8,4633.3793,N,01148.6548,E,1,,,180.6,M,,M,,*6B\n'
  ]);
  const trip = await parse(stream);
  assert.deepEqual(trip, {
    track: [
      [{
        coordinates: {
          lat: 46.55632166666667,
          lon: 11.810913333333334
        },
        timestamp: '2023-09-25T08:37:12.800Z'
      }]
    ]
  });
});

test('parse track', async function () {
  const stream = createFromStream('/fixtures/example.log');
  const trip = await parse(stream);
  const expected = require('./fixtures/example.json');
  assert.deepEqual(trip, expected);
});

function createFromStream(file) {
  const name = path.join(__dirname, file);
  const stream = createReadStream(name);
  return Readable.toWeb(stream).pipeThrough(new TextDecoderStream('ascii'));
}
