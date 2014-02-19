/*! Parker v0.0.0 - MIT license */

'use strict';

module.exports = {
    id: 'total-declarations',
    name: 'Total Declarations',
    type: 'declaration',
    aggregate: 'sum',
    measure: function (declaration) {
        return 1;
    }
};