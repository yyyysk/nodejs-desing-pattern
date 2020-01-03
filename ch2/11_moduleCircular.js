// モジュールa.js
exports.loaded = false;
const b = require('./b');
module.exports = {
  bWasLoaded: b.loaded,
  loaded: true,
};

// モジュールb.js
exports.loaded = false;
const a = require('./a');
module.exports = {
  aWasLoaded: a.loaded,
  loaded: true,
};

// main.js
const a = require('./a');
const b = require('./b');
console.log(a); // { bWasLoaded: true, loaded: true }
console.log(b); // { aWasLoaded: false, loaded: true }

