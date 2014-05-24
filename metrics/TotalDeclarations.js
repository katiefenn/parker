/*! Parker v0.0.0 - MIT license */

'use strict';

module.exports = {
    id: 'total-declarations',
    name: 'Total Declarations',
    type: 'declaration',
    aggregate: 'sum',
    format: 'number',
    measure: function (declaration) {
        return 1;
    }
};