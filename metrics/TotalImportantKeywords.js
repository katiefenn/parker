/*! Parker v0.1.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'total-important-keywords',
    name: 'Total Important Keywords',
    type: 'value',
    aggregate: 'sum',
    format: 'number',
    measure: function (value) {
        if (value.match(/!important/g))
            return 1;
        return 0;
    }
};
