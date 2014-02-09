/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'identifiers-per-selector',
    name: 'Identifiers Per Selector',
    type: 'selector',
    aggregate: 'mean',
    measure: function (selector) {
        var identifiers = selector.split(/[\s>\.]|:{1,2}|\[/g);

        if (identifiers.length === 1 && identifiers[0] === '') {
            return 0;
        }

        return identifiers.length;
    }
};