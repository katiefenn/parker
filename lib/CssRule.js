/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

function CssRule(raw) {
    this.raw = raw;
}

CssRule.prototype.getSelectors = function () {
    return getSelectors(getSelectorBlock(this.raw));
};

CssRule.prototype.getDeclarations = function () {
    return getDeclarations(getDeclarationBlock(this.raw));
};

var getSelectorBlock = function (rule) {
    var pattern = /([^{]+)\{/g,
        results = pattern.exec(rule);

    return results[1];
};

var getSelectors = function (selectorBlock) {
    var untrimmedSelectors = selectorBlock.split(','),
        trimmedSelectors = untrimmedSelectors.map(function (untrimmed) {
            return untrimmed.trim();
        });

    return _.compact(trimmedSelectors);
};

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

module.exports = CssRule;
