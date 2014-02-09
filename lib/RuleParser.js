/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

function RuleParser() {

}

RuleParser.prototype.parse = function (rule) {
    return parseRule(rule);
};

var parseRule = function (rule) {
    return {
        selectors: getSelectors(getSelectorBlock(rule)),
        declarations: getDeclarations((getDeclarationBlock(rule))),
        type: 'rule'
    };
};

var getSelectorBlock = function (rule) {
    var pattern = /([\w,\.#\-\[\]\"=\s:>]+)[\s]?\{/g,
        results = pattern.exec(rule);

    return results[1];
};

var getSelectors = function (selectorBlock) {
    var untrimmedSelectors = selectorBlock.split(','),
        trimmedSelectors = untrimmedSelectors.map(function (untrimmed) {
            return untrimmed.trim();
        });

    return trimmedSelectors;
};

var getDeclarationBlock = function (rule) {
    var pattern = /\{(.+)\}/g;

    return pattern.exec(rule)[1];
};

var getDeclarations = function (declarationBlock) {
    var untrimmedDeclarations = _.compact(declarationBlock.trim().split(';')),
        trimmedDeclarations = untrimmedDeclarations.map(function (untrimmed) {
            return untrimmed.trim();
        });

    return trimmedDeclarations;
};

module.exports = RuleParser;