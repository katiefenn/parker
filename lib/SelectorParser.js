/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

function SelectorParser() {

}

SelectorParser.prototype.parse = function (selector) {
    return parseRule(selector);
};

var parseRule = function  (selector) {
    return {
        identifiers: getIdentifiers(selector),
        type: 'selector'
    };
};

var getIdentifiers = function (selector) {
    var identifiers = [],
        segments = selector.split(/\s+[\s\+>]\s?|~^=/g);

    _.each(segments, function (segment) {
        identifiers = identifiers.concat(segment.match(/[#\.:]?[\w\-\*]+|\[[\w=\-~'"\|]+\]|:{2}[\w-]+/g));
    });

    return identifiers;
};

module.exports = SelectorParser;