const nmea = require("nmea-simple");

module.exports = makeStream;

/* global TransformStream */

function makeStream(types) {
  return new TransformStream(makeSource(types));
}

function makeSource(types) {
  let prefix = '';
  return {
    transform,
    flush
  };

  /**
   * @param {String} chunk
   * @param {TransformStreamDefaultController} controller
   */
  function transform(chunk, controller) {
    const lines = chunk.split(/[\n\r]+/);
    if (prefix) {
      lines[0] = prefix + lines[0];
    }
    prefix = lines.length > 0 ? lines.pop() : '';
    for (const line of lines) {
      processSentence(line, controller);
    }
  }

  /**
   * @param {TransformStreamDefaultController} controller
   */
  function flush(controller) {
    processSentence(prefix, controller);
  }

  function processSentence(line, controller) {
    if (line[0] === '$') {
      const packet = nmea.parseNmeaSentence(line);
      const { sentenceId } = packet;
      if (types[sentenceId]) {
        controller.enqueue(packet);
      }
    }
  }
}
