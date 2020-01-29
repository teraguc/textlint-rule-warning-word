'use strict';

var yaml = require('js-yaml');

var fs = require('fs');

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // Make an array of characters to check.


function getWordsArray(options) {
  var wordsArray = [];
  var rulePaths = options.rulePaths || [];

  for (var i = 0; i < rulePaths.length; i++) {
    var rulePath = __dirname + '/../dict/' + rulePaths[i];
    fs.access(rulePath, function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
    var wordsArray_work = yaml.safeLoad(fs.readFileSync(rulePath));
    wordsArray_work = wordsArray_work.rules || [];
    wordsArray = wordsArray.concat(wordsArray_work);
  }

  return wordsArray;
} // An error occurs in RegEx if you do not enclose the character with a slash.
// In this function, delete the slash.


function delPerfixAndSafix(word) {
  var delWord = word.slice(1);
  delWord = delWord.slice(0, -1);
  return delWord;
}

exports['default'] = function (context) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var Syntax = context.Syntax;
  var getSource = context.getSource;
  var report = context.report;
  var RuleError = context.RuleError;
  return _defineProperty({}, Syntax.Document, function (node) {
    return new Promise(function (resolve, reject) {
      var text = getSource(node);
      var words = getWordsArray(options);
      words.forEach(function (word) {
        word = delPerfixAndSafix(word);
        var pattern = new RegExp(word, "g");
        var result = [];

        while (result = pattern.exec(text)) {
          var index = result.index;
          var matchWord = result[0];
          var ruleError = new RuleError('正しい使い方ですか: ' + matchWord, {
            index: index
          });
          report(node, ruleError);
        }
      });
      resolve();
    });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=textlint-rule-warning-word.js.map