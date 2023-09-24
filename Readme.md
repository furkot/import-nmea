[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# @furkot/import-nmea

Import [NMEA] files into Furkot.

## Install

```sh
$ npm install --save @furkot/import-nmea
```

## Usage

Use as a transform stream: pipe network responses, files etc..

```js
const nmea = require('@furkot/import-nmea');
const { body } = await fetch('https://example.com/my.log');
const from = body.pipeThrough(new TextDecoderStream('ascii));
const trip = await nmea(from);

console.log(trip);
```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[NMEA]: https://en.wikipedia.org/wiki/NMEA_0183

[npm-image]: https://img.shields.io/npm/v/@furkot/import-nmea
[npm-url]: https://npmjs.org/package/@furkot/import-nmea

[build-url]: https://github.com/furkot/import-nmea/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/furkot/import-nmea/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@furkot/import-nmea
[deps-url]: https://libraries.io/npm/@furkot%2Fimport-nmea
