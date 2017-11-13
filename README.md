# chrome-launcher-client
> chrome-launcher manager client.

## Install

```bash
$ npm install chrome-launcher-client
```

## Usage

```js
const chromeLaunch = require('chrome-launcher-client');

chromeLaunch.launch({
  port: 0, // `chrome-launcher-server` port
  ... // other `chrome-launcher` options
},
  '0.0.0.0' // `chrome-launcher-server` host
).then(chrome => {
  // {pid: '', kill(){...}}
})
```