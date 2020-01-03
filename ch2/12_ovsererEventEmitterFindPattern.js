const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

/**
 * 受け取ったパスのファイルを読み込み、正規表現でマッチする記述があるかチェック
 * error, fileread, match の3つのイベントを発火
 * @param { string[] } files
 * @param { regex } regex
 */
function findPattern(files, regex) {
  const emitter = new EventEmitter;
  files.forEach(function(file) {
    fs.readFile(file, 'utf8', (err, content) => {
      if (err) {
        return emitter.emit('error', err);
      }

      emitter.emit('fileread', file);
      let match;
      if (match = content.match(regex)) {
        match.forEach(elem => emitter.emit('found', file, elem));
      }
    });
  });
  return emitter;
}

// fileread, found, errorのイベントに対してリスナーを登録
findPattern(['fileA.txt', 'fileB.json'], /hello \w+/g);
  .on('fileread', file => console.log(file + ' was read')
  .on('found', (file, match) => console.log(`Matched ${match} in file ${file}`)
  .on('error', err => console.log(`Error emmitted: ${err}`);

