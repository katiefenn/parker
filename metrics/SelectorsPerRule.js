/*! Parker v0.0.0 - MIT license */

'use strict';

module.exports = {
    id: 'selectors-per-rule',
    name: 'Selectors Per Rule',
    type: 'rule',
    aggregate: 'mean',
    format: 'number',
    measure: function (rule) {
        return getSelectors(getSelectorBlock(rule)).length;
    }
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

    return trimmedSelectors;
};