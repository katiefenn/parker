/*! Parker v0.0.0 - MIT license */

'use strict';

module.exports = {
    id: 'total-rules',
    name: 'Total Rules',
    type: 'rule',
    aggregate: 'sum',
    measure: function (rule) {
        return 1;
    }
};