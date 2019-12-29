const fs = require('fs');
const cache = {};

// filenameから読み込んだデータをcallbackを呼び出して処理
function inconsistentRead(filename, callback) {
  // cacheにデータがあるときは同期的に実行される
  if (cache[filename]) {
    callback(cache[filename]);
  } else {
    // データがないときは非同期の関数fs.readFile()を呼び出す
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  // listenersに登録されている関数をすべて実行するコールバック
  // を渡して、ファイルを読み込む
  inconsistentRead(filename, value => {
    listeners.forEach(listener => listener(value)); 
  });

  return {
    // onDataReadyに渡された関数はlistenersにpushされ、
    // fileの読み込みが終わった段階で実行される
    onDataReady: listener => listeners.push(listener),
  };
}

// data.txtを読み込む
const reader1 = createFileReader('data.txt');
// コールバックをlistenerに登録する
reader1.onDataReady(data => {
  console.log('First call data: ' + data);
  // すでにdata.txtのキャッシュが存在しているので、コールバックは同期的に実行される
  // しかしこの時点ではreader2のlistnersは空のため、コールバックは実行されない
  const reader2 = createFileReader('data.txt');
  // ここでコールバックを登録しても、読み込んだ時点ですでに同期的に実行されてしまっているため、
  // reader2のlistenersに登録されたコールバックは呼び出されることはない
  reader2.onDataReady( data => {
    console.log('Secont call data: ' + data); 
  });
});

