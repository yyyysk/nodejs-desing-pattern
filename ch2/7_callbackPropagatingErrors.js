const fs = require('fs');

function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if (err) {
      // ファイル読み込みエラーを通知して関数を抜ける
      return callback(err);
    }

    // try,catchで囲んでいる理由:
    // JSON.parse()で例外が発生した場合にハンドリングができないから
    // コールバックの呼び出し元を囲んでも、呼び出し元とコールバックではスタックが異なる
    // のでキャッチできない。
    // 例外はイベントループまで伝搬し、アプリケーションは停止する
    try {
      // ファイルをパース
      parsed = JSON.parse(data);
    } catch(err) {
      // 解析エラーを通知して関数を抜ける
      return callback(err);
    }
    // エラーなし。処理結果を通知
    callback(null, parsed);
  });
}

