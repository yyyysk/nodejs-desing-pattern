function loadModule(filename, module, require) {
  const wrappedSrc = `(function(module, exports, require) {
    ${fs.readFileSync(filename, 'utf8')}
  })(module, module.exports, require);`;
  eval(wrappedSrc);
}

const requireMine = moduleName => {
  console.log(`RequireMine invoded for module: ${moduleName}`);
  // モジュール名をファイル名に変換する
  // 結果を定数idに保存する
  const id = requireMine.resolve(moduleName);
  // 過去にロードされたものなら、キャッシュが残っているのでキャッシュを戻す
  if (requireMine.cache[id]) {
    return requireMine.cache[id].exports;
  }

  // モジュールのメタデータ[モジュールに保持するデータ]
  const module = {
    exports: {},
    id: id
  };
  // キャッシュの更新
  // moduleをキャッシュする
  requireMine.cache[id] = module;

  // モジュールをロード
  // モジュールのソースをファイルから読み込み、eval()を実行する
  // module.exportsに読み込んだ公開APIをエクスポートする
  loadModule(id, module, requireMine);

  // 公開する変数をリターン
  // 公開APIをリターン
  return module.exports;
};

requireMine.cache = {};
requireMine.resolve = (moduleName) => {
  // モジュール名を完全な識別子（ここではファイルパス）に変換する
};

