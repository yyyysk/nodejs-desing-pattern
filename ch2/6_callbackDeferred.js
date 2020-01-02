const fs = require('fs');
const cache = {};

function consistentReadAsync(filename, callback) {
  if (cache[filename]){
    // callback()をイベントキューの先頭にpushする
    // callback()は次のイベントで実行される。
    // すでに登録されているI/O処理よりも先に
    process.nextTick(() => callback(cache[filename]);
  } else {
    // 非同期処理
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    }
  }
}

