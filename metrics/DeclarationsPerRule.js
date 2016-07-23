/*! Parker v0.0.0 - MIT license */

'use strict';

module.exports = {
    id: 'declarations-per-rule',
    name: 'Declarations Per Rule',
    type: 'rule',
    aggregate: 'mean',
    format: 'number',
    measure: function (rule) {
        return getDeclarations(getDeclarationBlock(rule)).length;
    }
};

var _ = require('lodash');

var getDeclarationBlock = function (rule) {
  var pattern = /\{(.+)\}/g,
      results = pattern.exec(rule);

  if (_.isNull(results)) {
      return '';
  }

  return results[1];
};

var getDeclarations = function (declarationBlock) {
  var untrimmedDeclarations = _.compact(declarationBlock.trim().split(';')),
      trimmedDeclarations = untrimmedDeclarations.map(function (untrimmed) {
          return untrimmed.trim();
      });

  return trimmedDeclarations;
};
