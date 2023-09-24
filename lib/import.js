const makeStream = require('./stream');

module.exports = importNmea;

/* global WritableStream */

/**
 * Parses ASCII stream containing NMEA messages into Furkot's trip
 * @param {ReadableStream} from
 */
async function importNmea(from) {
  const stream = makeStream({ GGA: true });
  const track = [];

  await from.pipeThrough(stream).pipeTo(new WritableStream({
    write: packet => track.push(toStop(packet))
  }));

  return {
    track: [track]
  };
}

function toStop({ longitude, latitude, time }) {
  return {
    coordinates: {
      lon: longitude,
      lat: latitude
    },
    timestamp: time.toISOString()
  };
}
