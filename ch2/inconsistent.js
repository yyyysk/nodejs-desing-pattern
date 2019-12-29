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
  inconsistentRead(filename, value => {
    listeners.forEach(listener => listener(value)); 
  });

  return {
    onDataReady: listener => listeners.push(listener),
  };
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
  console.log('First call data: ' + data);
  const reader2 = createFileReader('data.txt');
  reader2.onDataReady( data => {
    console.log('Secont call data: ' + data); 
  });
});

