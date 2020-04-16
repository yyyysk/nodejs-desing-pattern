const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends stream.Writable {
  constructor() {
    super({objectMode: true});
  }

  _write(chunk, encoding, callback) {
    console.log('path', path.dirname(chunk.path));
    mkdirp(path.dirname(chunk.path))
      .then(() => {
        fs.writeFile(chunk.path, chunk.content, callback);
      })
      .catch(err => callback(err));
  }
}

module.exports = ToFileStream;
