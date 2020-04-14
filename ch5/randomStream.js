const stream = require('stream');
const Chance = require('chance');
const chance = new Chance();

class RandomStream extends stream.Readable {
  /**
   * optionsの中身
   * encoding
   * objectMode
   * hightWaterMark
   */
  constructor(options) {
    super(options);
  }

  _read(size) {
    // ランダム文字列生成
    const chunk = chance.string();
    console.log(`Pushing chunk of size: ${chunk.length}`);
    // 内部的な読み込み用のバッファに文字列をpush.Stringをプッシュしているのでencodingを指定
    // バイナリならencodingは不要
    this.push(chunk, 'utf-8');
    // streamを5%の確率でランダムに停止
    if(chance.bool({likelihood: 5})) {
      // nullをバッファにpushしてEOFを示す
      this.push(null);
    }
  }
}

module.exports = RandomStream;
