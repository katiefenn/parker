/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'identifiers-per-selector',
    name: 'Identifiers Per Selector',
    type: 'selector',
    aggregate: 'mean',
    format: 'number',
    measure: function (selector) {
        var identifiers = getIdentifiers(selector);

        if (identifiers.length === 1 && identifiers[0] === '') {
            return 0;
        }

        return identifiers.length;
    }
};

var getIdentifiers = function (selector) {
    var identifiers = [],
        segments = selector.split(/\s+[\s\+>]\s?|~^=/g);

    _.each(segments, function (segment) {
        identifiers = identifiers.concat(segment.match(/[#\.:]?[\w\-\*]+|\[[\w=\-~'"\|]+\]|:{2}[\w-]+/g) || []);
    });

    return identifiers;
};