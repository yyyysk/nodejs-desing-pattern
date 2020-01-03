'use strict';

const urlParse = require('url').parse;
const slug = require('slug');
const path = require('path');

// urlからfile名を取り出す?
module.exports.urlToFilename = function urlToFilename(url) {
  // URL解析
  const parsedUrl = urlParse(url);
  // パースして、URLエンコードされている文字列をデコードして読める形にする?
  const urlPath = parsedUrl.path.split('/')
    .filter(component => component !== '')
    .map(component => slug(component, { remove: null }))
    .join('/');
  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/html/)) {
    filename += '.html';
  }

  return filename;
};

