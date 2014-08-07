
/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'total-id-selectors',
    name: 'Total Id Selectors',
    type: 'selector',
    aggregate: 'sum',
    format: 'number',
    measure: function (selector) {
        return selector.indexOf('#') > 0 ? 1 : 0;
    }
};
