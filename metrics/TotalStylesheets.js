/*! Parker v0.0.0 - MIT license */

'use strict';

module.exports = {
    id: 'total-stylesheets',
    name: 'Total Stylesheets',
    type: 'stylesheet',
    aggregate: 'sum',
    format: 'number',
    measure: function (stylesheet) {
        return 1;
    }
};