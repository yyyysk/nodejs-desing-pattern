const fs = require('fs');
const cache = {};

function consistentReadSync(filename) {
  if (cache[filename]) {
    return cache[filename];
  } else {
    cache[filename] = fs.readSync(filename, 'utf8');
    return cache[filename];
  }
}


