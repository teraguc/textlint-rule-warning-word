'use strict';

const yaml = require('js-yaml')
const fs = require('fs')

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
      obj[key] = value;
  } return obj;
}

// Make an array of characters to check.
function getWordsArray(options) {
  let wordsArray = [];
  const rulePaths = options.rulePaths || [];
  for ( let i = 0; i < rulePaths.length; i++ ) {
      let rulePath = (__dirname + '/../dict/' + rulePaths[i]);
      fs.access(rulePath, function (err) {
          if (err) {
              console.error(err);
              process.exit(1);
          }
      });
  let wordsArray_work = yaml.safeLoad(fs.readFileSync(rulePath));
  wordsArray_work = wordsArray_work.rules || [];
  wordsArray = wordsArray.concat(wordsArray_work);
  }
  return wordsArray;
}

// An error occurs in RegEx if you do not enclose the character with a slash.
// In this function, delete the slash.
function delPerfixAndSafix(word) {
  let delWord = word.slice( 1 );
  delWord = delWord.slice( 0, -1 );
  return delWord;
}


exports['default'] = function (context) {
  const options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  const Syntax = context.Syntax;
  const getSource = context.getSource;
  const report = context.report;
  const RuleError = context.RuleError;

  return _defineProperty({}, Syntax.Document, function (node) {
      return new Promise(function (resolve, reject) {
          const text = getSource(node);
          let words = getWordsArray(options);
          words.forEach(function (word) {
              word = delPerfixAndSafix(word);
              const pattern = new RegExp(word,"g");
              let result = [];
              while ( result = pattern.exec(text)) {
                  let index = result.index;
                  let matchWord = result[0];
                  const ruleError = new RuleError('正しい使い方ですか: ' + matchWord, {index: index});
                  report(node, ruleError);
              }
          });
          resolve();
      });
  });
};

module.exports = exports['default'];
