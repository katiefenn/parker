/*! Parker v0.1.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'total-selectors',
    name: 'Total Selectors',
    type: 'selector',
    aggregate: 'sum',
    format: 'number',
    measure: function (selector) {
        return 1;
    }
};
