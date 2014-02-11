/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

function CssSelector(raw) {
    this.raw = raw;
}

CssSelector.prototype.getIdentifiers = function () {
    var identifiers = [],
        segments = this.raw.split(/\s+[\s\+>]\s?|~^=/g);

    _.each(segments, function (segment) {
        identifiers = identifiers.concat(segment.match(/[#\.:]?[\w\-\*]+|\[[\w=\-~'"\|]+\]|:{2}[\w-]+/g));
    });

    return identifiers;
};

module.exports = CssSelector;