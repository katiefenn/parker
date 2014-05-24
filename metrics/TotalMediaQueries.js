/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'total-media-queries',
    name: 'Total Media Queries',
    type: 'mediaquery',
    aggregate: 'length',
    format: 'number',
    measure: function (query) {
        return query;
    },
    filter: function (value, index, self) {
        return self.indexOf(value) === index;
    }
};