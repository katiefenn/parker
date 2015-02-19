/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('lodash');

module.exports = {
    id: 'total-identifiers',
    name: 'Total Identifiers',
    type: 'identifier',
    aggregate: 'sum',
    format: 'number',
    measure: function (identifier) {
        return 1;
    }
};