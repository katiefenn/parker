/*! Parker v0.0.0 - MIT license */

'use strict';

var _ = require('underscore');

module.exports = {
    id: 'unique-colours',
    name: 'Unique Colors',
    type: 'value',
    aggregate: 'list',
    measure: function (value) {
        return getColourHexes(value);
    },
    filter: function (value, index, self) {
        return self.indexOf(value) === index;
    }
};

var getColourHexes = function (value) {
    var colourHexes = value.match(/#[0-9a-fA-F]{3,6}/g);

    if (_.isNull(colourHexes)) {
        colourHexes = [];
    }

    return colourHexes;
};