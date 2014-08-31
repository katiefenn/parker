/*! Parker v0.1.0 - MIT license */

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
