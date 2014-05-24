/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'media-queries',
    name: 'Media Queries',
    type: 'mediaquery',
    aggregate: 'list',
    format: 'list',
    measure: function (query) {
        return query;
    },
    filter: function (value, index, self) {
        return self.indexOf(value) === index;
    }
};